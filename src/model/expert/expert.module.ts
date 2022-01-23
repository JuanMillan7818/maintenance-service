import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpertController } from './expert.controller';
import { Expert } from './expert.entity';
import { ExpertService } from './expert.service';

@Module({
  imports: [TypeOrmModule.forFeature([Expert])],
  controllers: [ExpertController],
  providers: [ExpertService]
})
export class ExpertModule {}
