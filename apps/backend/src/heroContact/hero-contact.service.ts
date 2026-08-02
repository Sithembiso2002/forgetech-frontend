// apps/backend/src/heroContact/hero-contact.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateHeroContactDto } from './dto/create-hero-contact.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class HeroContactService {
  constructor(private prisma: PrismaService) {}

  async submit(dto: CreateHeroContactDto) {
    // 1. Save to database (all fields including attachmentBase64)
    const submission = await this.prisma.contactSubmission.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone || null,
        enquiryType: 'request-call',
        message: dto.message,
        budget: dto.budget || null,
        attachmentBase64: dto.attachmentBase64 || null,   // ✅ now stored
      },
    });

    // 2. Send email with attachment (unchanged)
    await this.sendEmail(dto);

    return submission;
  }

  private async sendEmail(dto: CreateHeroContactDto) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure:
        process.env.SMTP_SECURE === 'true' ||
        Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions: any = {
      from: process.env.SMTP_FROM,
      to: process.env.CONTACT_RECIPIENT,
      subject: `New Hero Request Call – ${dto.name}`,
      html: `
        <h3>New Request Call</h3>
        <p><strong>Name:</strong> ${dto.name}</p>
        <p><strong>Email:</strong> ${dto.email}</p>
        <p><strong>Phone:</strong> ${dto.phone || 'Not provided'}</p>
        <p><strong>Budget:</strong> ${dto.budget || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <p>${dto.message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Attach file if a base64 string is provided
    if (dto.attachmentBase64) {
      const matches = dto.attachmentBase64.match(
        /^data:([^;]+);base64,(.+)$/,
      );
      if (matches) {
        const mimeType = matches[1];
        const base64Data = matches[2];
        const buffer = Buffer.from(base64Data, 'base64');
        mailOptions.attachments = [
          {
            filename: `attachment.${mimeType.split('/')[1] || 'dat'}`,
            content: buffer,
            contentType: mimeType,
          },
        ];
      }
    }

    await transporter.sendMail(mailOptions);
  }
}