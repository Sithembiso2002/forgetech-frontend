// apps/backend/src/contact/contact.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}   // ← inject the shared service

  async submit(dto: CreateContactDto) {
    const submission = await this.prisma.contactSubmission.create({ data: dto });
    await this.sendEmail(dto);
    return submission;
  }

  private async sendEmail(dto: CreateContactDto) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: process.env.SMTP_SECURE === 'true' || Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.CONTACT_RECIPIENT,
      subject: `New Contact Enquiry – ${dto.name}`,
      html: `
        <h3>New Contact Enquiry</h3>
        <p><strong>Name:</strong> ${dto.name}</p>
        <p><strong>Email:</strong> ${dto.email}</p>
        <p><strong>Phone:</strong> ${dto.phone || 'Not provided'}</p>
        <p><strong>Enquiry Type:</strong> ${dto.enquiryType}</p>
        ${dto.service ? `<p><strong>Service:</strong> ${dto.service}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${dto.message.replace(/\n/g, '<br>')}</p>
      `,
    });
  }
}