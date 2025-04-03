import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
  IsArray,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsString()
  @IsOptional()
  readonly githubUrl?: string; // ✅ 카멜 케이스 적용

  @IsString()
  @IsOptional()
  readonly demoUrl?: string; // ✅ 카멜 케이스 적용

  @IsString()
  @IsOptional()
  readonly thumbnail?: string;

  @IsInt()
  @IsNotEmpty()
  readonly ownerId: number; // ✅ 카멜 케이스 적용

  @IsArray()
  @IsString({ each: true }) // ✅ 배열 안의 값이 문자열인지 검증
  @IsOptional()
  readonly techStack?: string[];
}

export class UpdateProjectDto {
  @IsString()
  @IsOptional()
  readonly title?: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsString()
  @IsOptional()
  readonly githubUrl?: string;

  @IsString()
  @IsOptional()
  readonly demoUrl?: string;

  @IsString()
  @IsOptional()
  readonly thumbnail?: string;

  @IsArray()
  @IsString({ each: true }) // ✅ 배열 안의 값이 문자열인지 검증
  @IsOptional()
  readonly techStack?: string[];
}
