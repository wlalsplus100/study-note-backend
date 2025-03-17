// src/post/post.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from '../schemas/post.schema';
import { CreatePostDto, UpdatePostDto } from '../dto/post.dto';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const createdPost = new this.postModel(createPostDto);
    return createdPost.save();
  }

  async findAll(): Promise<Post[]> {
    return this.postModel
      .find()
      .populate('owner_id', 'username profile_image')
      .populate('category_id', 'name')
      .exec();
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.postModel
      .findById(id)
      .populate('owner_id', 'username profile_image')
      .populate('category_id', 'name')
      .exec();

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    // 조회수 증가
    await this.postModel.findByIdAndUpdate(id, { $inc: { view_count: 1 } });

    return post;
  }
  async findByCategory(categoryId: string): Promise<Post[]> {
    return this.postModel
      .find({ category_id: categoryId })
      .populate('owner_id', 'username profile_image')
      .populate('category_id', 'name')
      .exec();
  }

  async findByOwner(ownerId: string): Promise<Post[]> {
    return this.postModel
      .find({ owner_id: ownerId })
      .populate('category_id', 'name')
      .exec();
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    const updatedPost = await this.postModel
      .findByIdAndUpdate(id, updatePostDto, { new: true })
      .exec();

    if (!updatedPost) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return updatedPost;
  }

  async remove(id: string): Promise<void> {
    const result = await this.postModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
  }
}
