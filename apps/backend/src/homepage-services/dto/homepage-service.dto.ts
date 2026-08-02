// apps/backend/src/homepage-services/dto/homepage-service.dto.ts
export class HomepageServiceDto {
  id!: string;
  serviceId!: string;
  slug!: string;           // from the related Service
  title!: string;
  shortDescription!: string;
  description!: string;
  features!: string[];
  image1!: string;
  image2!: string;
  cta!: string;
  order!: number;
}