import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateBlogOwnerDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;

  @IsString()
  @IsOptional()
  readonly profileImage?: string;

  @IsString()
  @IsOptional()
  readonly bio?: string;
}

export class UpdateBlogOwnerDto {
  @IsString()
  @IsOptional()
  readonly username?: string;

  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @IsString()
  @IsOptional()
  @MinLength(6)
  readonly password?: string; // passwordHash 대신 password 유지

  @IsString()
  @IsOptional()
  readonly profileImage?: string;

  @IsString()
  @IsOptional()
  readonly bio?: string;
}
