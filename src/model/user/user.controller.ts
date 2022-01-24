import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { ReqCreateUserDTO } from 'src/dto/user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private service: UserService) {}

    @Get()
    public async getUsers() {
        try {
            return await this.service.findAll();            
        } catch (error) {
            throw new HttpException(
                `An internal error has occurred ${error}`,
                HttpStatus.BAD_GATEWAY);
        }
    }


    @Get(':id')
    public async getUserById(@Param('id') id: number) {
        try {
            let data = await this.service.findOne(id);
            if(!data) {
                throw new Error('There is no record with the provided id');
            }
            return data;
        } catch (error) {
            throw new HttpException(
                `An internal error has occurred ${error}`,
                HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post()
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

    @Delete(':id')
    public async deleteUser(@Param('id') id: number) {
        let request: User;                
        try {
            if(!id) {
                throw new Error('To perform the DELETE operation, you must indicate the id you want to remove');                
            }       
            request = await this.service.findOne(id);            
            if(!request) {          
                throw new Error('Make sure the id you want to remove exists');
            }
            return await this.service.deleteUser(request);
        } catch (error) {        
            throw new HttpException(
                `An internal error has occurred, ${error}`,
                HttpStatus.BAD_GATEWAY);
        }        
    }
}
