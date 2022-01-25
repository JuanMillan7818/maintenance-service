import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class ConfigOrmService {
    public getTypeOrmConfigProduction(): TypeOrmModuleOptions {          
        return {
            url: process.env.DATABASE_URL,
            type: 'postgres',
            ssl: {
                rejectUnauthorized: false,
            },          
            entities: ['dist/**/*.entity{.ts,.js}'],
            synchronize: true,           
            autoLoadEntities: true
        }
    }

    public getTypeOrmConfigDev(): TypeOrmModuleOptions {          
        return {            
            type: 'postgres',           
            host: process.env.POSTGRES_HOST,
            port: parseInt(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,            
            entities: ['dist/**/*.entity{.ts,.js}'],
            synchronize: true,           
            autoLoadEntities: true
        }
    }
}

const configOrm = new ConfigOrmService();
export {configOrm};