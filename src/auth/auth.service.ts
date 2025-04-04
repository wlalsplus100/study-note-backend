// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BlogOwner } from '../entities/blog-owner.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(BlogOwner)
    private blogOwnerRepository: Repository<BlogOwner>,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<BlogOwner, 'passwordHash'> | null> {
    const user = await this.blogOwnerRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordHash: _, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: Omit<BlogOwner, 'passwordHash'>) {
    const payload = { email: user.email, sub: user.id };
    const access_token = await this.jwtService.signAsync(payload);
    return {
      access_token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
  }
}
