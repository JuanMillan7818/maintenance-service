import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ReqCreateMaintenanceDTO } from 'src/dto/maintenance.dto';
import { Maintenance } from './maintenance.entity';
import { MaintenanceService } from './maintenance.service';

@Controller('maintenance')
export class MaintenanceController {
    constructor(private service: MaintenanceService){ }

    @Get()
    public async getServicesMaintenance() {
        try {            
            return await this.service.findAll();
        } catch (error) {
            throw new HttpException(
                'An internal error has occurred ',
                HttpStatus.BAD_GATEWAY);
        }
    }

    @Post()
    public async createServicesMaintenance(@Body() task: ReqCreateMaintenanceDTO) {
        const { description, type } = task;
        if(!description || !type) {
            throw new HttpException(
                'The field names must match and exist. The fields are { description: string, type: string }',
                HttpStatus.BAD_REQUEST);
        }
        if(typeof(description) != 'string' || typeof(type) != 'string') {
            throw new HttpException(
                'The data types do not match, they must all be string',
                HttpStatus.BAD_REQUEST);
        }
        try {            
            return await this.service.createTypeMaintenance(new Maintenance(description, type));                
        } catch (error) {
            throw new HttpException(
                'An internal error has occurred',
                HttpStatus.BAD_GATEWAY);
        }
    }
}
