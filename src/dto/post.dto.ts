import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsMongoId,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly content_markdown: string;

  @IsString()
  @IsOptional()
  readonly content_html?: string;

  @IsString()
  @IsOptional()
  readonly featured_image?: string;

  @IsMongoId()
  @IsNotEmpty()
  readonly owner_id: string;

  @IsMongoId()
  @IsNotEmpty()
  readonly category_id: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  readonly published_at?: Date;
}

export class UpdatePostDto {
  @IsString()
  @IsOptional()
  readonly title?: string;

  @IsString()
  @IsOptional()
  readonly content_markdown?: string;

  @IsString()
  @IsOptional()
  readonly content_html?: string;

  @IsString()
  @IsOptional()
  readonly featured_image?: string;

  @IsMongoId()
  @IsOptional()
  readonly category_id?: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  readonly published_at?: Date;
}
