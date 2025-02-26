import { Test, TestingModule } from '@nestjs/testing';
import { CampainhaController } from './campainha.controller';

describe('CampainhaController', () => {
  let controller: CampainhaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampainhaController],
    }).compile();

    controller = module.get<CampainhaController>(CampainhaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
