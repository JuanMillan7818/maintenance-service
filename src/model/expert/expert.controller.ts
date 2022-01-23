import { Controller, Get } from '@nestjs/common';
import { ExpertService } from './expert.service';

@Controller('expert')
export class ExpertController {
    constructor(private service: ExpertService) { }

    @Get()
    public async getAll() {
        return await this.service.findAll();
    }
}
