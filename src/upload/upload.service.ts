// src/upload/upload.service.ts
import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { existsSync, unlinkSync } from 'fs';

@Injectable()
export class UploadService {
  private uploadPath = 'uploads';

  getFileUrl(filename: string): string {
    return `/${this.uploadPath}/${filename}`;
  }

  deleteFile(filename: string): void {
    const filePath = join(process.cwd(), this.uploadPath, filename);
    if (existsSync(filePath)) {
      unlinkSync(filePath);
    } else {
      throw new Error('File not found');
    }
  }
}
