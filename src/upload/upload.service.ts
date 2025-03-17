// src/upload/upload.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  getFileUrl(filename: string): string {
    return `/uploads/${filename}`;
  }
}
