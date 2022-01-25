import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiHeader, ApiInternalServerErrorResponse, ApiNoContentResponse, ApiOkResponse, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReqCreateCustomerDTO } from 'src/dto/customer.dto';
import { Description } from 'src/util/descriptions/descriptions';
import { Customer } from './customer.entity';
import { CustomerService } from './customer.service';

@ApiHeader({
    name: 'x-api-key',
    description: Description.header
})
@ApiTags('Clientes')    
@Controller('customer')
export class CustomerController {
    constructor(private service: CustomerService) {}

    @Get()    
    @ApiOkResponse({description: Description.ok})
    @ApiInternalServerErrorResponse({description: Description.error_internal})
    public async getCustomers() {
        try {
            return await this.service.findAll();            
        } catch (error) {
            throw new HttpException(
                `An internal error has occurred ${error}`,
                HttpStatus.BAD_GATEWAY);
        }
    }

    @Get(':id')    
    @ApiParam({
        name: 'id',
        description: 'id del Cliente a retornar'
    })
    @ApiOkResponse({description: Description.ok})
    @ApiNoContentResponse({description: Description.no_found})
    @ApiInternalServerErrorResponse({description: Description.error_internal})
    public async getCustomerById(@Param('id') id: number) {  
        let code_http = HttpStatus.INTERNAL_SERVER_ERROR;      
        try {
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
        type: ReqCreateCustomerDTO,
        description: Description.body_title
    })
    @ApiCreatedResponse({description: Description.createOk})
    @ApiBadRequestResponse({description: Description.bad_request})
    @ApiInternalServerErrorResponse({description: Description.error_internal})
    public async createCustomer(@Body() data: ReqCreateCustomerDTO) {
        const { id_customer } = data;
        if(!id_customer) {
            throw new HttpException(
                'The request requires the fields: { id_customer: number }',
                HttpStatus.BAD_REQUEST);      
        }
        if(typeof(id_customer) != 'number') {
            throw new HttpException(
                'Fields must contain numeric values',
                HttpStatus.BAD_REQUEST);
        }

        try {
            return await this.service.createCustomer(new Customer(id_customer));
        } catch (error) {
            throw new HttpException(
                `An internal error has occurred ${error}`,
                HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
