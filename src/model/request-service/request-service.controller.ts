import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateRequestDTO } from 'src/dto/create-request.dto';
import { RequestServiceService } from './request-service.service';
import { RequestServices } from './request-services.entity';

@Controller('request-service')
export class RequestServiceController {
    constructor(private service: RequestServiceService) {}

    @Get()
    public async getAll() {
        return await this.service.findAll();
    }

    @Post()
    public async createRequestServices(@Body() task: CreateRequestDTO) {
        
    }
}

