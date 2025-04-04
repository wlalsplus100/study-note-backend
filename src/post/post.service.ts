import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { CreatePostDto, UpdatePostDto } from '../dto/post.dto';
import { BlogOwner } from '../entities/blog-owner.entity';
import { Category } from '../entities/category.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(BlogOwner)
    private blogOwnerRepository: Repository<BlogOwner>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const { ownerId, categoryId, ...postData } = createPostDto;

    const owner = await this.blogOwnerRepository.findOne({
      where: { id: ownerId },
    });
    if (!owner) {
      throw new NotFoundException(`Owner with ID ${ownerId} not found`);
    }

    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }

    const post = this.postRepository.create({
      ...postData,
      owner,
      category,
    });

    return this.postRepository.save(post);
  }

  async findAll(): Promise<Post[]> {
    return this.postRepository.find({
      relations: ['owner', 'category'],
    });
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['owner', 'category'],
    });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  async findByCategory(categoryId: number): Promise<Post[]> {
    return this.postRepository.find({
      where: { category: { id: categoryId } },
      relations: ['owner', 'category'],
    });
  }

  async findByOwner(ownerId: number): Promise<Post[]> {
    return this.postRepository.find({
      where: { owner: { id: ownerId } },
      relations: ['owner', 'category'],
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.findOne(id);
    const updatedPost = this.postRepository.merge(post, updatePostDto);
    return this.postRepository.save(updatedPost);
  }

  async remove(id: number): Promise<void> {
    const result = await this.postRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
  }
}
