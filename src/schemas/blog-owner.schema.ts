// src/schemas/blog-owner.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlogOwnerDocument = BlogOwner & Document;

@Schema({ timestamps: true })
export class BlogOwner {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password_hash: string;

  @Prop()
  profile_image: string;

  @Prop()
  bio: string;
}

export const BlogOwnerSchema = SchemaFactory.createForClass(BlogOwner);
