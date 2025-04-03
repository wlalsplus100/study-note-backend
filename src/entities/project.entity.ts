// src/entities/project.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { BlogOwner } from './blog-owner.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ nullable: true })
  githubUrl: string;

  @Column({ nullable: true })
  demoUrl: string;

  @Column({ nullable: true })
  thumbnail: string;

  @Column('simple-array', { nullable: true })
  techStack: string[];

  @ManyToOne(() => BlogOwner, (blogOwner) => blogOwner.projects, {
    eager: true,
    onDelete: 'CASCADE',
  })
  owner: BlogOwner;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
