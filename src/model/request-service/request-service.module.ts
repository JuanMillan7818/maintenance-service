import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestServiceController } from './request-service.controller';
import { RequestServiceService } from './request-service.service';
import { RequestServices } from './request-services.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RequestServices])],
  controllers: [RequestServiceController],
  providers: [RequestServiceService]
})
export class RequestServiceModule {}
