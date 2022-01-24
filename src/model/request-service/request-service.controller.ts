import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ReqCreateRequestDTO, ResCreareRequesDTO } from 'src/dto/create-request.dto';
import { generateToken } from 'src/util/token/generate-token';
import { RequestServiceService } from './request-service.service';
import { RequestServices } from './request-service.entity';

@Controller('request-service')
export class RequestServiceController {
    constructor(private service: RequestServiceService) {}

    @Get()
    public async getAll() {
        return await this.service.findAll();
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
        
        const { expert, result } = await this.service.assignExpertRandom();        
        const token: string = generateToken();
        console.log(expert, result);

        let resp = new ResCreareRequesDTO(result.first_name, result.last_name, token);         
        await this.service.createService(new RequestServices(
            token, task.id_customer, 
            expert.id_expert, task.id_info_service
        ));                
        return resp;        
    }    
}

