import { Test, TestingModule } from '@nestjs/testing';
import { CallDetailsService } from './call-details.service';

describe('CallDetailsService', () => {
  let service: CallDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CallDetailsService],
    }).compile();

    service = module.get<CallDetailsService>(CallDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
