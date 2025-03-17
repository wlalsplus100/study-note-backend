import { Test, TestingModule } from '@nestjs/testing';
import { BlogOwnerService } from './blog-owner.service';

describe('BlogOwnerService', () => {
  let service: BlogOwnerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlogOwnerService],
    }).compile();

    service = module.get<BlogOwnerService>(BlogOwnerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
