// apps/backend/src/newsletter/newsletter.service.ts
import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNewsletterDto } from './dto/create-newsletter.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NewsletterService {
  constructor(private prisma: PrismaService) {}

  async subscribe(dto: CreateNewsletterDto) {
    // Check for duplicate email
    const existing = await this.prisma.newsletterSubscription.findUnique({
      where: { email: dto.email },
    });

    if (existing) {
      throw new ConflictException('Email is already subscribed.');
    }

    // Save to database
    const subscription = await this.prisma.newsletterSubscription.create({
      data: dto,
    });

    // Send email notification to company inbox
    await this.sendNotification(dto.email);

    return { message: 'Subscription successful!', subscription };
  }

  private async sendNotification(subscriberEmail: string) {
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

    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: process.env.CONTACT_RECIPIENT,      // you'll receive the notification here
      subject: 'New Newsletter Subscription',
      html: `
        <h3>New Newsletter Subscriber</h3>
        <p><strong>Email:</strong> ${subscriberEmail}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        <p>You have a new subscriber to your newsletter.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
  }
}