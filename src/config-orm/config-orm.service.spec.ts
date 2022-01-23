import { Test, TestingModule } from '@nestjs/testing';
import { ConfigOrmService } from './config-orm.service';

describe('ConfigOrmService', () => {
  let service: ConfigOrmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigOrmService],
    }).compile();

    service = module.get<ConfigOrmService>(ConfigOrmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
