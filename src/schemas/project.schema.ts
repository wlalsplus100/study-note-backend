// src/schemas/project.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { BlogOwner } from './blog-owner.schema';

export type ProjectDocument = Project & Document;

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  github_url: string;

  @Prop()
  demo_url: string;

  @Prop()
  thumbnail: string;

  @Prop()
  techStack: string[];

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'BlogOwner',
    required: true,
  })
  owner_id: BlogOwner;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
