// src/entities/post.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { BlogOwner } from './blog-owner.entity';
import { Category } from './category.entity';
import { Comment } from './comment.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  contentMarkdown: string;

  @Column({ nullable: true, type: 'text' })
  contentHtml: string;

  @Column({ nullable: true })
  featuredImage: string;

  @Column({ default: 0 })
  viewCount: number;

  @Column({ nullable: true, type: 'timestamp' })
  publishedAt: Date;

  @ManyToOne(() => BlogOwner, (blogOwner) => blogOwner.posts, {
    eager: true,
    onDelete: 'CASCADE',
  })
  owner: BlogOwner;

  @ManyToOne(() => Category, (category) => category.posts, {
    eager: true,
    onDelete: 'SET NULL',
  })
  category: Category;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
