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
  findOne(@Param('id') id: string) {
    return this.blogOwnerService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBlogOwnerDto: UpdateBlogOwnerDto,
  ) {
    return this.blogOwnerService.update(id, updateBlogOwnerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogOwnerService.remove(id);
  }
}
