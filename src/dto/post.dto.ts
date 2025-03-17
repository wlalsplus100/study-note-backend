// src/dto/post.dto.ts
export class CreatePostDto {
  readonly title: string;
  readonly content_markdown: string;
  readonly content_html?: string;
  readonly featured_image?: string;
  readonly owner_id: string;
  readonly category_id: string;
  readonly published_at?: Date;
}

export class UpdatePostDto {
  readonly title?: string;
  readonly content_markdown?: string;
  readonly content_html?: string;
  readonly featured_image?: string;
  readonly category_id?: string;
  readonly published_at?: Date;
}
