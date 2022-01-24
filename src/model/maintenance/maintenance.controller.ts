import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { ReqCreateMaintenanceDTO } from 'src/dto/maintenance.dto';
import { MessageError } from 'src/interfaces/message-erros';
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
                `An internal error has occurred ${error}`,
                HttpStatus.BAD_GATEWAY);
        }
    }

    @Get(':id')
    public async getServicesMaintenanceById(@Param('id') id_services: string) {
        try {
            let data = await this.service.findOne(id_services);
            if(!data) {
                throw new Error('There is no record with the provided id')
            }
            return data;
        } catch (error) {            
            throw new HttpException(
                `An internal error has occurred ${error}`,
                HttpStatus.INTERNAL_SERVER_ERROR);
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
                `An internal error has occurred ${error}`,
                HttpStatus.BAD_GATEWAY);
        }
    }

    @Delete(':id')
    public async deleteServiceMaintenance(@Param('id') id_service: string) {
        let maintenance: Maintenance;                
        try {
            if(!id_service) {
                throw new Error('To perform the DELETE operation, you must indicate the id you want to remove');                
            }       
            maintenance = await this.service.findOne(id_service);            
            if(!maintenance) {          
                throw new Error('Make sure the id you want to remove exists');
            }
            return await this.service.deleteTypeMaintenance(maintenance);
        } catch (error) {        
            throw new HttpException(
                `An internal error has occurred, ${error}`,
                HttpStatus.BAD_GATEWAY);
        }        
    }
}
