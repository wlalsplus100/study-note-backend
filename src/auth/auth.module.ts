// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BlogOwner, BlogOwnerSchema } from '../schemas/blog-owner.schema';
import { BlogOwnerModule } from '../blog-owner/blog-owner.module';

@Module({
  imports: [
    BlogOwnerModule,
    MongooseModule.forFeature([
      { name: BlogOwner.name, schema: BlogOwnerSchema },
    ]),
    JwtModule.register({
      secret: 'YOUR_SECRET_KEY', // 실제 환경에서는 환경 변수를 사용하세요
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
