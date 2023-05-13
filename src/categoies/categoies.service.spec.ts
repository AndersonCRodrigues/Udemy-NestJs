import { Test, TestingModule } from '@nestjs/testing';
import { CategoiesService } from './categoies.service';

describe('CategoiesService', () => {
  let service: CategoiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoiesService],
    }).compile();

    service = module.get<CategoiesService>(CategoiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
