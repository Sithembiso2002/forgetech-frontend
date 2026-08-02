// apps/backend/src/search/dto/search-result.dto.ts
export class SearchResultDto {
  id!: string;
  title!: string;
  description?: string;   // optional, already okay
  href!: string;
  type!: string;
}