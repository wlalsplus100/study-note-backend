import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly contentMarkdown: string;

  @IsString()
  @IsOptional()
  readonly contentHtml?: string;

  @IsString()
  @IsOptional()
  readonly featuredImage?: string;

  @IsInt()
  @IsNotEmpty()
  readonly ownerId: number; // ✅ 카멜 케이스로 수정 (TypeORM에서 더 자연스러움)

  @IsInt()
  @IsNotEmpty()
  readonly categoryId: number; // ✅ 카멜 케이스 적용

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  readonly publishedAt?: Date; // ✅ 카멜 케이스 적용
}

export class UpdatePostDto {
  @IsString()
  @IsOptional()
  readonly title?: string;

  @IsString()
  @IsOptional()
  readonly contentMarkdown?: string; // ✅ 카멜 케이스 적용

  @IsString()
  @IsOptional()
  readonly contentHtml?: string;

  @IsString()
  @IsOptional()
  readonly featuredImage?: string;

  @IsInt()
  @IsOptional()
  readonly categoryId?: number; // ✅ 카멜 케이스 적용

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  readonly publishedAt?: Date; // ✅ 카멜 케이스 적용
}
