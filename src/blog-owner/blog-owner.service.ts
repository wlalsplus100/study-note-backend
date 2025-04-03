// src/blog-owner/blog-owner.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BlogOwner } from '../entities/blog-owner.entity';
import { CreateBlogOwnerDto, UpdateBlogOwnerDto } from '../dto/blog-owner.dto';

@Injectable()
export class BlogOwnerService {
  constructor(
    @InjectRepository(BlogOwner)
    private blogOwnerRepository: Repository<BlogOwner>,
  ) {}

  async create(createBlogOwnerDto: CreateBlogOwnerDto): Promise<BlogOwner> {
    const hashedPassword = await bcrypt.hash(createBlogOwnerDto.password, 10);
    const newBlogOwner = this.blogOwnerRepository.create({
      ...createBlogOwnerDto,
      passwordHash: hashedPassword,
    });
    return this.blogOwnerRepository.save(newBlogOwner);
  }

  async findAll(): Promise<BlogOwner[]> {
    return this.blogOwnerRepository.find();
  }

  async findOne(id: number): Promise<BlogOwner> {
    const owner = await this.blogOwnerRepository.findOne({ where: { id } });
    if (!owner) {
      throw new NotFoundException(`Blog owner with ID ${id} not found`);
    }
    return owner;
  }

  async update(
    id: number,
    updateBlogOwnerDto: UpdateBlogOwnerDto,
  ): Promise<BlogOwner> {
    const owner = await this.findOne(id);

    if (updateBlogOwnerDto.password) {
      owner.passwordHash = await bcrypt.hash(updateBlogOwnerDto.password, 10);
    }

    const updatedOwner = { ...owner, ...updateBlogOwnerDto };
    delete updatedOwner.password;
    return this.blogOwnerRepository.save(updatedOwner);
  }

  async remove(id: number): Promise<void> {
    const result = await this.blogOwnerRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Blog owner with ID ${id} not found`);
    }
  }
}
