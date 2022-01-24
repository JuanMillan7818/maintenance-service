import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, getConnection, getRepository, Repository } from 'typeorm';
import { Customer } from '../customer/customer.entity';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) 
        private usersRepository: Repository<User>) { }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(id: number) {
        return this.usersRepository.findOne({where: {id_user: id}});
    }

    createUser(data: User) {
        return this.usersRepository.save(data);
    }

    async deleteUser(data: User) {
        let result = await getRepository(Customer).createQueryBuilder('customer')
        .where("customer.id_customer = :id",{ id: 1 }).getOne();
        console.log('resultado', result);
        
        //return this.usersRepository.remove(data);
    }
}
