import { Test, TestingModule } from '@nestjs/testing';
import { SalutiController } from './saluti.controller';

describe('SalutiController', () => {
  let controller: SalutiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalutiController],
    }).compile();

    controller = module.get<SalutiController>(SalutiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
