import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiHeader, ApiInternalServerErrorResponse, ApiNoContentResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { ReqCreateMaintenanceDTO } from 'src/dto/maintenance.dto';
import { Description } from 'src/util/descriptions/descriptions';
import { Maintenance } from './maintenance.entity';
import { MaintenanceService } from './maintenance.service';

@ApiHeader({
    name: 'x-api-key',
    description: Description.header
})
@ApiTags('Servicios')
@Controller('maintenance')
export class MaintenanceController {
    constructor(private service: MaintenanceService){ }

    @Get()
    @ApiOkResponse({description: `${Description.ok}, Por lo tanto devuelve todos los servicios que la empresa ofrece y que se encuentran registrados`})
    @ApiInternalServerErrorResponse({description: Description.error_internal})
    public async getServicesMaintenance() {
        try {            
            return await this.service.findAll();
        } catch (error) {
            throw new HttpException(
                `An internal error has occurred ${error}`,
                HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    @ApiParam({name: 'id', description: Description.params})
    @ApiOkResponse({description: Description.ok})
    @ApiNoContentResponse({description: Description.no_found})
    @ApiInternalServerErrorResponse({description: Description.error_internal})
    public async getServicesMaintenanceById(@Param('id') id_services: string) {
        let code_http = HttpStatus.INTERNAL_SERVER_ERROR;
        try {
            let data = await this.service.findOne(id_services);
            if(!data) {
                code_http = HttpStatus.NO_CONTENT;
                throw new Error('There is no record with the provided id')
            }
            return data;
        } catch (error) {            
            throw new HttpException(
                `An internal error has occurred ${error}`,
                code_http);
        }
    }

    @Post()
    @ApiBody({
        type: ReqCreateMaintenanceDTO,        
        description: Description.body_title
    })
    @ApiCreatedResponse({description: Description.createOk})
    @ApiBadRequestResponse({description: Description.bad_request})
    @ApiInternalServerErrorResponse({description: Description.error_internal})
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
                HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
