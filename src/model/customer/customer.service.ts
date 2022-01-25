import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';

@Injectable()
export class CustomerService {
    private sqlQuerys: string[] = [
        `SELECT * FROM customers AS T1 INNER JOIN users AS T2
        ON T1.id_customer=T2.id_user AND T1.id_customer=`
    ]

    constructor(
        @InjectRepository(Customer) 
        private customersRepository: Repository<Customer>) {}
    
    findAll(): Promise<Customer[]> {
        return this.customersRepository.find({
            join: {
                alias: 'customer',
                innerJoinAndSelect: {
                    cond1: 'customer.id_customer'
                }
            }
        });
    }

    findOne(id: number): Promise<Customer> {
        return this.customersRepository.query(`${this.sqlQuerys[0]}${id}`);
    }

    createCustomer(data: Customer): Promise<Customer> {
        return this.customersRepository.save(data);
    }
}
