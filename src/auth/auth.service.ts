// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { BlogOwner, BlogOwnerDocument } from '../schemas/blog-owner.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(BlogOwner.name)
    private blogOwnerModel: Model<BlogOwnerDocument>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.blogOwnerModel.findOne({ email }).exec();
    if (user && (await bcrypt.compare(password, user.password_hash))) {
      const { password_hash, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    };
  }
}
