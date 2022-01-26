import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiHeader, ApiInternalServerErrorResponse, ApiNoContentResponse, ApiOkResponse, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReqCreateUserDTO } from 'src/dto/user.dto';
import { Description } from 'src/util/descriptions/descriptions';
import { User } from './user.entity';
import { UserService } from './user.service';

@ApiHeader({
    name: 'x-api-key',
    description: Description.header
})
@ApiTags('Usuarios')
@Controller('user')
export class UserController {
    constructor(private service: UserService) {}

    @Get()    
    @ApiOkResponse({description: `${Description.ok}, Por lo tanto devuelve todos los usuarios creados en el sistema`})
    @ApiInternalServerErrorResponse({description: Description.error_internal})
    public async getUsers() {
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
    public async getUserById(@Param('id') id: number) {
        let code_http = HttpStatus.INTERNAL_SERVER_ERROR;
        try {
            let data = await this.service.findOne(id);
            if(!data) {
                code_http = HttpStatus.NO_CONTENT;
                throw new Error('There is no record with the provided id');
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
        type: ReqCreateUserDTO,
        description: `${Description.body_title}, ademas a continuacion se muestra un ejemplo`
    })
    @ApiCreatedResponse({description: Description.createOk})
    @ApiBadRequestResponse({description: Description.bad_request})    
    @ApiInternalServerErrorResponse({description: Description.error_internal})
    public async createUser(@Body() user: ReqCreateUserDTO) {
        const {first_name, last_name, email, username, password} = user;
        if(!first_name || !last_name || !email || !username || !password) {
            throw new HttpException(
                'The request requires the fields: { first_name: string, last_name: string, ' +
                'email: string, username: string, password: string }',
                HttpStatus.BAD_REQUEST);   
        }
        if(typeof(first_name) != 'string' || typeof(last_name) != 'string' ||
            typeof(email) != 'string' || typeof(username) != 'string' ||
            typeof(password) != 'string' ) {
                throw new HttpException(
                    'Fields must contain string values',
                    HttpStatus.BAD_REQUEST);
        }
        try {
            return await this.service.createUser(new User(first_name, last_name, email, username, password));            
        } catch (error) {
            throw new HttpException(
                `An internal error has occurred ${error}`,
                HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
