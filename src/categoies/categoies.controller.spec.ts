import { Test, TestingModule } from '@nestjs/testing';
import { CategoiesController } from './categoies.controller';

describe('CategoiesController', () => {
  let controller: CategoiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoiesController],
    }).compile();

    controller = module.get<CategoiesController>(CategoiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
