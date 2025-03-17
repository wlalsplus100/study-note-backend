// src/blog-owner/blog-owner.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { BlogOwner, BlogOwnerDocument } from '../schemas/blog-owner.schema';
import { CreateBlogOwnerDto, UpdateBlogOwnerDto } from '../dto/blog-owner.dto';

@Injectable()
export class BlogOwnerService {
  constructor(
    @InjectModel(BlogOwner.name)
    private blogOwnerModel: Model<BlogOwnerDocument>,
  ) {}

  async create(createBlogOwnerDto: CreateBlogOwnerDto): Promise<BlogOwner> {
    const hashedPassword = await bcrypt.hash(createBlogOwnerDto.password, 10);
    const createdBlogOwner = new this.blogOwnerModel({
      ...createBlogOwnerDto,
      password_hash: hashedPassword,
    });
    return createdBlogOwner.save();
  }

  async findAll(): Promise<BlogOwner[]> {
    return this.blogOwnerModel.find().exec();
  }

  async findOne(id: string): Promise<BlogOwner> {
    const owner = await this.blogOwnerModel.findById(id).exec();
    if (!owner) {
      throw new NotFoundException(`Blog owner with ID ${id} not found`);
    }
    return owner;
  }

  async update(
    id: string,
    updateBlogOwnerDto: UpdateBlogOwnerDto,
  ): Promise<BlogOwner> {
    const updateData = { ...updateBlogOwnerDto };

    if (updateBlogOwnerDto.password) {
      updateData.password_hash = await bcrypt.hash(
        updateBlogOwnerDto.password,
        10,
      );
      delete updateData.password;
    }

    const updatedOwner = await this.blogOwnerModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    if (!updatedOwner) {
      throw new NotFoundException(`Blog owner with ID ${id} not found`);
    }

    return updatedOwner;
  }

  async remove(id: string): Promise<void> {
    const result = await this.blogOwnerModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Blog owner with ID ${id} not found`);
    }
  }
}
