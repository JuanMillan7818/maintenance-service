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

    async getExpertRandom(): Promise<Expert> {
        const listExperts: Expert[] = await this.findAll();
        let indexRandom: number = Math.floor(
            Math.random() * (listExperts.length - 1) + 1);
        
        console.log(indexRandom);
        return listExperts.at(indexRandom);
        
    }
}
