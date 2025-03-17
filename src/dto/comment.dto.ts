// src/dto/comment.dto.ts
export class CreateCommentDto {
  readonly nickname: string;
  readonly content: string;
  readonly post_id: string;
}

export class UpdateCommentDto {
  readonly nickname?: string;
  readonly content?: string;
}
