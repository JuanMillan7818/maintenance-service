import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { Customer } from '../customer/customer.entity';
import { Expert } from '../expert/expert.entity';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) 
        private usersRepository: Repository<User>) { }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(id: number): Promise<User> {
        return this.usersRepository.findOne({where: {id_user: id}});
    }

    createUser(data: User): Promise<User> {
        return this.usersRepository.save(data);
    }

    async deleteUser(data: User) {
        let result = await getRepository(Customer).createQueryBuilder('customer')
            .where("customer.id_customer = :id",{ id: 1 }).getOne();
        if(!result) {
            let tmp = await getRepository(Expert).createQueryBuilder('expert')
                .where("expert.id_expert = :id",{ id: 1 }).getOne();
        }else {
            let a = await getRepository(Customer).remove(result);            
            console.log('eliminado', a);            
        }
        console.log('resultado', result);
        
        //return this.usersRepository.remove(data);
    }
}
