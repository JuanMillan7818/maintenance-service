import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataJoin } from 'src/interfaces/data-join';
import { Connection, getRepository, Repository } from 'typeorm';
import { Expert } from '../expert/expert.entity';
import { RequestServices } from './request-service.entity';

@Injectable()
export class RequestServiceService {

    private sqlQuerys: [string] = [
        `SELECT id_expert, first_name, last_name FROM users AS T1 INNER JOIN
            experts AS T2 ON T1.id_user=T2.id_expert WHERE T1.id_user=`
    ];

    constructor(
        @InjectRepository(RequestServices)
        private requestRepository: Repository<RequestServices>,
        private connection: Connection) {}
    
    findAll(): Promise<RequestServices[]> {
        return this.requestRepository.find();
    }

    findOne(id: string): Promise<RequestServices> {
        return this.requestRepository.findOne({where: {id_request: id}});
    }

    createService(data: RequestServices): Promise<RequestServices> {
        return this.requestRepository.save(data);
    }    

    async assignExpertRandom(): Promise<{expert: Expert, result: DataJoin}> {
        let listData: Expert[];
        let indexRandom: number;
        try {
            listData = await getRepository(Expert).find();
            if(listData) {
                indexRandom = Math.floor(
                    Math.random() * (listData.length - 1) + 1);                                       
                let result: DataJoin = await this.requestRepository.query(this.sqlQuerys[0]+listData[indexRandom].id_expert); 

                return {
                    expert: listData[indexRandom],
                    result: result[0]
                };
            }                    
        } catch (err) {
            console.log(err);                            
        }
        
        return {
            expert: null,
            result: null
        };
    }

    deleteRequestService(data: RequestServices): Promise<RequestServices> {
        return this.requestRepository.remove(data);
    }
}
