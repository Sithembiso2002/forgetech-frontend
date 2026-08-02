import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { SupabaseModule } from './supabase/supabase.module';
import { AuthModule } from './modules/auth/auth.module';
import { ServicesModule } from './services/services.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { BlogModule } from './modules/blog/blog.module';
import { VacanciesModule } from './modules/vacancies/vacancies.module';
import { ApplicationsModule } from './modules/applications/applications.module';
import { TeamModule } from './modules/team/team.module';
import { TestimonialsModule } from './modules/testimonials/testimonials.module';
import { MediaModule } from './modules/media/media.module';
import { SubServicesModule } from './modules/sub-services/sub-services.module';
import { ContactModule } from './contact/contact.module';
import { HeroContactModule } from './heroContact/hero-contact.module';
import { NewsletterModule } from './newsletter/newsletter.module';
import { SearchModule } from './search/search.module';
import { HomepageServicesModule } from './homepage-services/homepage-services.module';
import { TeammessageModule } from './teammessage/teammessage.module';
import { NewsModule } from './modules/news/news.module';
import { HomepageNewsModule } from './modules/homepage-news/homepage-news.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    SupabaseModule,
    AuthModule,
    ServicesModule,
    ProjectsModule,
    BlogModule,
    NewsModule,
    VacanciesModule,
    ApplicationsModule,
    TeamModule,
    TestimonialsModule,
    MediaModule,
    SubServicesModule,
    ContactModule,
    HeroContactModule,
    NewsletterModule,
    SearchModule,
    HomepageServicesModule,
    TeammessageModule,
    HomepageNewsModule,
  ],
})
export class AppModule {}