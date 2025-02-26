import { Test, TestingModule } from '@nestjs/testing';
import { CampainhaService } from './campainha.service';

describe('CampainhaService', () => {
  let service: CampainhaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CampainhaService],
    }).compile();

    service = module.get<CampainhaService>(CampainhaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
