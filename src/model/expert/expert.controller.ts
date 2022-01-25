import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiHeader, ApiInternalServerErrorResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ReqCreateExpertDTO } from 'src/dto/expert.dto';
import { Description } from 'src/util/descriptions/descriptions';
import { Expert } from './expert.entity';
import { ExpertService } from './expert.service';

@ApiHeader({
    name: 'x-api-key',
    description: Description.header
})
@ApiTags('Tecnicos')
@Controller('expert')
export class ExpertController {
    constructor(private service: ExpertService) { }

    @Get()
    @ApiOkResponse({description: Description.ok})
    @ApiInternalServerErrorResponse({description: Description.error_internal})
    public async getExperts() {
        try {
            return await this.service.findAll();            
        } catch (error) {
            throw new HttpException(
                `An internal error has occurred ${error}`,
                HttpStatus.BAD_GATEWAY);
        }
    }

    @Get('/services/:id')
    @ApiOkResponse({description: Description.ok})
    @ApiBadRequestResponse({description: Description.bad_request})
    @ApiNoContentResponse({description: Description.no_found})
    @ApiInternalServerErrorResponse({description: Description.error_internal})
    public async getServicesExpert(@Param('id') id: number) {    
        let code_http: number = HttpStatus.INTERNAL_SERVER_ERROR;        
        try {
            if(!parseInt(id.toString())) {
                code_http = HttpStatus.BAD_REQUEST;
                throw new Error('Wrong parameter data type');
            }   
            let result = await this.service.findServices(id);                        
            
            if(result.length === 0) {                
                code_http = HttpStatus.NO_CONTENT;
                throw new Error('There is no record with the provided id');                
            }
            return result;
        } catch (error) {
            throw new HttpException(
                `An internal error has occurred ${error}`,
                code_http);
        }                        
    }

    @Get(':id')
    @ApiOkResponse({description: Description.ok})
    @ApiBadRequestResponse({description: Description.bad_request})
    @ApiNoContentResponse({description: Description.no_found})
    @ApiInternalServerErrorResponse({description: Description.error_internal})
    public async getExpertById(@Param('id') id: number) {    
        let code_http: number = HttpStatus.INTERNAL_SERVER_ERROR;                  
        try {
            if(!parseInt(id.toString())) {
                code_http = HttpStatus.BAD_REQUEST;
                throw new Error('Wrong parameter data type');                
            }
            let result = await this.service.findOne(id);
            if(!result) {
                code_http = HttpStatus.NO_CONTENT;
                throw new Error('There is no record with the provided id');
            }
            return result;
        } catch (error) {
            throw new HttpException(
                `An internal error has occurred ${error}`,
                code_http);
        }
    }
   
    @Post()
    @ApiBody({
        type: ReqCreateExpertDTO,
        description: Description.body_title
    })
    @ApiCreatedResponse({description: Description.createOk})
    @ApiBadRequestResponse({description: Description.bad_request})
    @ApiInternalServerErrorResponse({description: Description.error_internal})
    public async createExpert(@Body() data: ReqCreateExpertDTO) {
        const { id_expert, refer_contract, max_request } = data;
        if(!id_expert || !refer_contract || !max_request) {
            throw new HttpException(
                'The request requires the fields: { id_expert: number, refer_contract: string, max_request: number }',
                HttpStatus.BAD_REQUEST);      
        }
        if(typeof(id_expert) != 'number' || typeof(refer_contract) != 'string' 
            || typeof(max_request) != 'number') {
            throw new HttpException(
                'Type data the fields are incorrect',
                HttpStatus.BAD_REQUEST);                
        }

        try {
            return await this.service.createExpert(new Expert(id_expert, refer_contract, max_request));            
        } catch (error) {
            throw new HttpException(
                `An internal error has occurred ${error}`,
                HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
