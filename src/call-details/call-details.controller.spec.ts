import { Test, TestingModule } from '@nestjs/testing';
import { CallDetailsController } from './call-details.controller';
import { CallDetailsService } from './call-details.service';

describe('CallDetailsController', () => {
  let controller: CallDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CallDetailsController],
      providers: [CallDetailsService],
    }).compile();

    controller = module.get<CallDetailsController>(CallDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
