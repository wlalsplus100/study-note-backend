// src/upload/upload.controller.ts
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  Res,
  UseGuards,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { join } from 'path';
import { UploadService } from './upload.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('uploads')
export class UploadController {
  private readonly logger = new Logger(UploadController.name);

  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      // Add error handling
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return cb(
            new BadRequestException('Only image files are allowed!'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    // Add comprehensive error checking
    if (!file) {
      this.logger.error('No file uploaded');
      throw new BadRequestException('No file uploaded');
    }

    try {
      // Log file details for debugging
      this.logger.log(`File uploaded: ${JSON.stringify(file)}`);

      // Ensure filename exists, use originalname as fallback
      const filename = file.filename || file.originalname;

      return {
        filename: filename,
        originalname: file.originalname,
        url: this.uploadService.getFileUrl(filename),
      };
    } catch (error) {
      this.logger.error(`File upload error: ${error.message}`);
      throw new BadRequestException('File upload failed');
    }
  }

  @Get(':imagepath')
  getImage(@Param('imagepath') image: string, @Res() res: Response) {
    return res.sendFile(join(process.cwd(), 'uploads', image));
  }
}
