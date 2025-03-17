import { Test, TestingModule } from '@nestjs/testing';
import { BlogOwnerController } from './blog-owner.controller';

describe('BlogOwnerController', () => {
  let controller: BlogOwnerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogOwnerController],
    }).compile();

    controller = module.get<BlogOwnerController>(BlogOwnerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
