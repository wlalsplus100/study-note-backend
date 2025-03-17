// src/schemas/post.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { BlogOwner } from './blog-owner.schema';
import { Category } from './category.schema';

export type PostDocument = Post & Document;

@Schema({ timestamps: true })
export class Post {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content_markdown: string;

  @Prop()
  content_html: string;

  @Prop()
  featured_image: string;

  @Prop({ default: 0 })
  view_count: number;

  @Prop()
  published_at: Date;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'BlogOwner',
    required: true,
  })
  owner_id: BlogOwner;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Category',
    required: true,
  })
  category_id: Category;
}

export const PostSchema = SchemaFactory.createForClass(Post);
