import { Controller, Get } from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';

@Controller('maintenance')
export class MaintenanceController {
    constructor(private service: MaintenanceService){ }

    @Get()
    public async getAll() {
        return await this.service.findAll();
    }
}
