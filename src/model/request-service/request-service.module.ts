import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpertService } from '../expert/expert.service';
import { RequestServiceController } from './request-service.controller';
import { RequestServiceService } from './request-service.service';
import { RequestServices } from './request-service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RequestServices])],
  controllers: [RequestServiceController],
  providers: [RequestServiceService]
})
export class RequestServiceModule {}
