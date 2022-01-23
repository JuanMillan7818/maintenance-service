import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/model/user/users.entity';

@Injectable()
export class ConfigOrmService {
    public getTypeOrmConfig(): TypeOrmModuleOptions {
        console.log(process.env.POSTGRES_USER);
        
        return {
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: parseInt(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            entities: ['dist/**/*.entity{.ts,.js}'],
            //entities: [User]    
            //autoLoadEntities: true
        }
    }
}

const configOrm = new ConfigOrmService();
export {configOrm};