import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { EmailService } from '../services/email.service';
import { PdfService } from '../services/pdf.service';

@Injectable()
export class ShipmentsService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
    private pdfService: PdfService,
  ) {}

  async findAll() {
    return this.prisma.shipment.findMany({
      include: {
        milestones: { orderBy: { occurredAt: 'desc' } },
        documents: true,
      },
    });
  }

  async create(data: any) {
    const shipment = await this.prisma.shipment.create({
      data: {
        ref: data.ref,
        mode: data.mode,
        shipperEmail: data.shipper?.email,
        consigneeEmail: data.consignee?.email,
      },
    });
    return shipment;
  }

  async addMilestone(shipmentId: string, data: any) {
    const shipment = await this.prisma.shipment.findUnique({
      where: { id: shipmentId },
    });

    if (!shipment) {
      throw new Error('Shipment not found');
    }

    const milestone = await this.prisma.milestone.create({
      data: {
        shipmentId,
        code: data.code,
        occurredAt: new Date(data.occurred_at),
        data: data.data,
      },
    });

    // Generate PDF
    let pdfPath: string | undefined;
    if (['LOADED_VESSEL', 'DELIVERED_POD'].includes(data.code)) {
      pdfPath = await this.pdfService.generateDocument(
        shipment.ref,
        data.code,
        { milestone: data.code, ...data.data },
      );

      await this.prisma.document.create({
        data: {
          shipmentId,
          type: data.code,
          path: pdfPath,
        },
      });
    }

    // Send email
    const email = shipment.consigneeEmail || shipment.shipperEmail;
    if (email) {
      await this.emailService.sendMilestoneEmail(
        email,
        shipment.ref,
        data.code,
        pdfPath,
      );
    }

    return milestone;
  }
}
