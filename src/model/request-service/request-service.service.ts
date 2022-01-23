import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRequestDTO } from 'src/dto/create-request.dto';
import { Repository } from 'typeorm';
import { RequestServices } from './request-services.entity';

@Injectable()
export class RequestServiceService {
    constructor(
        @InjectRepository(RequestServices)
        private requestRepository: Repository<RequestServices>) {}
    
    public findAll(): Promise<RequestServices[]> {
        return this.requestRepository.find();
    }

    public createService(data: RequestServices): Promise<RequestServices> {
        return this.requestRepository.save(data);
    }
}
