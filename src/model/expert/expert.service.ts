import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expert } from './expert.entity';

@Injectable()
export class ExpertService {
    private sqlQuerys: string[] = [
        `SELECT * FROM experts AS T1 INNER JOIN request_services AS T2
            ON T1.id_expert=T2.id_expert AND T1.id_expert=`,
        `SELECT * FROM experts AS T1 INNER JOIN users AS T2
            ON T1.id_expert=T2.id_user AND T1.id_expert=`
    ];

    constructor(
        @InjectRepository(Expert)
        private expertRepository: Repository<Expert>) {}
    
    findAll(): Promise<Expert[]> {        
        return this.expertRepository.find({
            join: {
                alias: 'expert',
                innerJoinAndSelect: {
                    cond1: 'expert.id_expert'
                }
            }
        });
    }

    findOne(id: number): Promise<Expert> {
        return this.expertRepository.query(`${this.sqlQuerys[1]}${id}`);
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
