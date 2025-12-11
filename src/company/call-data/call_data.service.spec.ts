import { Test, TestingModule } from '@nestjs/testing';
import { CallDataService } from './call_data.service';

describe('CallDataService', () => {
  let service: CallDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CallDataService],
    }).compile();

    service = module.get<CallDataService>(CallDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
