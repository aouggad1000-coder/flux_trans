import { Module } from '@nestjs/common';
import { ShipmentsModule } from './shipments/shipments.module';
import { PrismaService } from './services/prisma.service';
import { EmailService } from './services/email.service';
import { PdfService } from './services/pdf.service';

@Module({
  imports: [ShipmentsModule],
  providers: [PrismaService, EmailService, PdfService],
  exports: [PrismaService, EmailService, PdfService],
})
export class AppModule {}
