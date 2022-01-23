import { Controller, Get } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
    constructor(private service: CustomerService) {}

    @Get()
    public async getAll() {
        return await this.service.findAll();
    }
}
