import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expert } from './expert.entity';

@Injectable()
export class ExpertService {
    constructor(
        @InjectRepository(Expert)
        private expertRepository: Repository<Expert>) {}
    
    findAll() : Promise<Expert[]> {
        return this.expertRepository.find();
    }
}
