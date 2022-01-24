import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { ReqCreateRequestDTO, ResCreareRequesDTO } from 'src/dto/create-request.dto';
import { generateToken } from 'src/util/token/generate-token';
import { RequestServiceService } from './request-service.service';
import { RequestServices } from './request-service.entity';

@Controller('request-service')
export class RequestServiceController {
    constructor(private service: RequestServiceService) {}

    @Get()
    public async getRequestServices() {
        try {
            return await this.service.findAll();            
        } catch (error) {
            throw new HttpException(
                `An internal error has occurred ${error}`,
                HttpStatus.BAD_GATEWAY);
        }
    }

    @Get(':id') 
    public async getRequestServicesById(@Param('id') id_request: string) {
        try {
            let data = await this.service.findOne(id_request);
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
    public async createRequestServices(@Body() task: ReqCreateRequestDTO) {
        if(!task.id_customer || !task.id_info_service) { 
            throw new HttpException(
                'The request requires the fields: { id_customer: number, id_info_service: number }',
                HttpStatus.BAD_REQUEST);            
        }
        if(typeof(task.id_customer) != 'number' || typeof(task.id_info_service) != 'number') {
            throw new HttpException(
                'Fields must contain numeric values',
                HttpStatus.BAD_REQUEST);
        }        
        
        try {
            const { expert, result } = await this.service.assignExpertRandom();        
            if(!expert || !result) {
                throw new Error('An error occurred while assigning the request to a technician');
            }
            const token: string = generateToken();
            console.log(expert, result);

            let resp = new ResCreareRequesDTO(result.first_name, result.last_name, token);         
            await this.service.createService(new RequestServices(
                token, task.id_customer, 
                expert.id_expert, task.id_info_service
            ));                
            return resp;            
        } catch (error) {
            throw new HttpException(
                `An internal error has occurred ${error}`,
                HttpStatus.INTERNAL_SERVER_ERROR);
        }        
    }    

    @Delete(':id')
    async deleteRequestServices(@Param('id') id_request: string) {
        let request: RequestServices;                
        try {
            if(!id_request) {
                throw new Error('To perform the DELETE operation, you must indicate the id you want to remove');                
            }       
            request = await this.service.findOne(id_request);  
                      
            if(!request) {          
                throw new Error('Make sure the id you want to remove exists');
            }
            return await this.service.deleteRequestService(request);
        } catch (error) {        
            throw new HttpException(
                `An internal error has occurred, ${error}`,
                HttpStatus.BAD_GATEWAY);
        }        
    }
}

