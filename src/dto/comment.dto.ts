import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  readonly nickname: string;

  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @IsInt()
  @IsNotEmpty()
  readonly postId: number;
}

export class UpdateCommentDto {
  @IsString()
  @IsOptional()
  readonly nickname?: string;

  @IsString()
  @IsOptional()
  readonly content?: string;
}
