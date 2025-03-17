// src/blog-owner/blog-owner.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogOwnerController } from './blog-owner.controller';
import { BlogOwnerService } from './blog-owner.service';
import { BlogOwner, BlogOwnerSchema } from '../schemas/blog-owner.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BlogOwner.name, schema: BlogOwnerSchema },
    ]),
  ],
  controllers: [BlogOwnerController],
  providers: [BlogOwnerService],
  exports: [BlogOwnerService],
})
export class BlogOwnerModule {}
