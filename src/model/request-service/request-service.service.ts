import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestServices } from './request-services.entity';

@Injectable()
export class RequestServiceService {
    constructor(
        @InjectRepository(RequestServices)
        private requestRepository: Repository<RequestServices>) {}
    
    findAll(): Promise<RequestServices[]> {
        return this.requestRepository.find();
    }
}
