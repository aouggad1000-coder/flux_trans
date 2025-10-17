import { Module } from '@nestjs/common';
import { ShipmentsController } from './shipments.controller';
import { ShipmentsService } from './shipments.service';
import { PrismaService } from '../services/prisma.service';
import { EmailService } from '../services/email.service';
import { PdfService } from '../services/pdf.service';

@Module({
  controllers: [ShipmentsController],
  providers: [ShipmentsService, PrismaService, EmailService, PdfService],
})
export class ShipmentsModule {}
