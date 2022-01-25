import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expert } from './expert.entity';

@Injectable()
export class ExpertService {
    private sqlQuerys: [string] = [
        `SELECT * FROM experts AS T1 INNER JOIN request_services AS T2
            ON T1.id_expert=T2.id_expert AND T1.id_expert=`
    ];

    constructor(
        @InjectRepository(Expert)
        private expertRepository: Repository<Expert>) {}
    
    findAll(): Promise<Expert[]> {
        return this.expertRepository.find();
    }

    findOne(id: number): Promise<Expert> {
        return this.expertRepository.findOne(id);
    }

    findServices(id_expert: number): Promise<any[]> {
        return this.expertRepository.query(`${this.sqlQuerys[0]}${id_expert}`);  
    }

    async getExpertRandom(): Promise<Expert> {
        const listExperts: Expert[] = await this.findAll();
        let indexRandom: number = Math.floor(
            Math.random() * (listExperts.length - 1) + 1);
                
        return listExperts.at(indexRandom);
        
    }

    createExpert(data: Expert): Promise<Expert> {
        return this.expertRepository.save(data);
    }
}
