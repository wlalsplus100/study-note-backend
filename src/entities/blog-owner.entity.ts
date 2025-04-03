// src/entities/blog-owner.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Post } from './post.entity';
import { Project } from './project.entity';

@Entity('blog_owners')
export class BlogOwner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ nullable: true })
  profileImage: string;

  @Column({ nullable: true, type: 'text' })
  bio: string;

  @OneToMany(() => Post, (post) => post.owner)
  posts: Post[];

  @OneToMany(() => Project, (project) => project.owner)
  projects: Project[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
