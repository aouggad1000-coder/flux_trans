import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'localhost',
      port: parseInt(process.env.SMTP_PORT || '1025'),
      secure: false,
      auth: process.env.SMTP_USER ? {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      } : undefined,
    });
  }

  async sendMilestoneEmail(to: string, shipmentRef: string, milestoneCode: string, attachmentPath?: string) {
    const mailOptions: any = {
      from: '"TransitFlow" <noreply@transitflow.com>',
      to,
      subject: `[${shipmentRef}] Milestone: ${milestoneCode}`,
      html: `
        <h2>Milestone Update</h2>
        <p>Shipment <strong>${shipmentRef}</strong> has reached milestone: <strong>${milestoneCode}</strong></p>
      `,
    };

    if (attachmentPath && fs.existsSync(attachmentPath)) {
      mailOptions.attachments = [{
        filename: attachmentPath.split('/').pop(),
        path: attachmentPath,
      }];
    }

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`📧 Email sent to ${to} for milestone ${milestoneCode}`);
    } catch (error) {
      console.error('Email error:', error);
    }
  }
}
