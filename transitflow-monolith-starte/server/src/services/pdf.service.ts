import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import PDFDocument from 'pdfkit';

@Injectable()
export class PdfService {
  private storagePath: string;

  constructor() {
    this.storagePath = process.env.STORAGE_PATH || './storage';
    if (!fs.existsSync(this.storagePath)) {
      fs.mkdirSync(this.storagePath, { recursive: true });
    }
  }

  async generateDocument(shipmentRef: string, type: string, data: any): Promise<string> {
    const filename = `${shipmentRef}-${type}-${Date.now()}.pdf`;
    const filepath = path.join(this.storagePath, filename);

    return new Promise((resolve, reject) => {
      const doc = new PDFDocument();
      const stream = fs.createWriteStream(filepath);

      doc.pipe(stream);
      
      doc.fontSize(20).text(`TransitFlow - ${type}`, { align: 'center' });
      doc.moveDown();
      doc.fontSize(14).text(`Shipment: ${shipmentRef}`);
      doc.text(`Date: ${new Date().toLocaleString()}`);
      doc.moveDown();
      doc.fontSize(12).text(`Type: ${type}`);
      doc.text(JSON.stringify(data, null, 2));

      doc.end();

      stream.on('finish', () => resolve(filepath));
      stream.on('error', reject);
    });
  }
}
