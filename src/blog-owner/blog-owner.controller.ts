// src/blog-owner/blog-owner.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BlogOwnerService } from './blog-owner.service';
import { CreateBlogOwnerDto, UpdateBlogOwnerDto } from '../dto/blog-owner.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('blog-owners')
export class BlogOwnerController {
  constructor(private readonly blogOwnerService: BlogOwnerService) {}

  @Post()
  create(@Body() createBlogOwnerDto: CreateBlogOwnerDto) {
    return this.blogOwnerService.create(createBlogOwnerDto);
  }

  @Get()
  findAll() {
    return this.blogOwnerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.blogOwnerService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateBlogOwnerDto: UpdateBlogOwnerDto,
  ) {
    return this.blogOwnerService.update(id, updateBlogOwnerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.blogOwnerService.remove(id);
  }
}
