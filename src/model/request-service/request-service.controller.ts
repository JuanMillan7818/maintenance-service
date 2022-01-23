import { Controller, Get } from '@nestjs/common';
import { RequestServiceService } from './request-service.service';

@Controller('request-service')
export class RequestServiceController {
    constructor(private service: RequestServiceService) {}

    @Get()
    public async getAll() {
        return await this.service.findAll();
    }
}
