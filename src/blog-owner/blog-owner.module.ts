import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogOwnerController } from './blog-owner.controller';
import { BlogOwnerService } from './blog-owner.service';
import { BlogOwner } from '../entities/blog-owner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BlogOwner])],
  controllers: [BlogOwnerController],
  providers: [BlogOwnerService],
  exports: [BlogOwnerService],
})
export class BlogOwnerModule {}
