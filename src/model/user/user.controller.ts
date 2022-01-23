import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private service: UserService) {}

    @Get()
    public async getAll() {
        return await this.service.findAll();
    }
}
