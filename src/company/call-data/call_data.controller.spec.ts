import { Test, TestingModule } from '@nestjs/testing';
import { CallDataController } from './call_data.controller';
import { CallDataService } from './call_data.service';

describe('CallDataController', () => {
  let controller: CallDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CallDataController],
      providers: [CallDataService],
    }).compile();

    controller = module.get<CallDataController>(CallDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
