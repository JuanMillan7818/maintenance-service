import { Test, TestingModule } from '@nestjs/testing';
import { RequestServiceController } from './request-service.controller';

describe('RequestServiceController', () => {
  let controller: RequestServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestServiceController],
    }).compile();

    controller = module.get<RequestServiceController>(RequestServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
