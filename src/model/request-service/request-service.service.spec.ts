import { Test, TestingModule } from '@nestjs/testing';
import { RequestServiceService } from './request-service.service';

describe('RequestServiceService', () => {
  let service: RequestServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestServiceService],
    }).compile();

    service = module.get<RequestServiceService>(RequestServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
