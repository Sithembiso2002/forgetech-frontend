export class SubServiceDto {
  id!: string;
  name!: string;
  description!: string;
  benefit!: string;
  image!: string | null;
}

export class CaseStudyDto {
  id!: string;
  title!: string;
  slug!: string;
  industry!: string;
  shortDescription!: string;
  mainImage!: string | null;
  technologies!: string[];
  results!: string;
}

export class ServiceResponseDto {
  id!: string;
  title!: string;
  slug!: string;
  icon!: string;
  shortDescription!: string;
  description!: string;
  benefits: string[] = [];
  technologies: string[] = [];
  industries: string[] = [];
  process: string[] = [];
  image!: string | null;
  subServices: SubServiceDto[] = [];
  caseStudies: CaseStudyDto[] = [];       // ← new
  testimonial: any;
  order!: number;
}