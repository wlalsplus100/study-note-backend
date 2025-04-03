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
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const newPost = this.postRepository.create(createPostDto);
    return this.postRepository.save(newPost);
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

    // 조회수 증가
    await this.postRepository.increment({ id }, 'viewCount', 1);

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
      relations: ['category'],
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.findOne(id);

    const updatedPost = { ...post, ...updatePostDto };
    await this.postRepository.save(updatedPost);

    return updatedPost;
  }

  async remove(id: number): Promise<void> {
    const result = await this.postRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
  }
}
