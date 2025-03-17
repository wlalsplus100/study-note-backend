export class CreateBlogOwnerDto {
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly profile_image?: string;
  readonly bio?: string;
}

export class UpdateBlogOwnerDto {
  readonly username?: string;
  readonly email?: string;
  readonly password?: string;
  readonly profile_image?: string;
  readonly bio?: string;
  readonly password_hash?: string;
}
