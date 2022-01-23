import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configOrm } from 'src/config-orm/config-orm.service';


@Module({
    imports: [ConfigModule.forRoot(),TypeOrmModule.forRoot(configOrm.getTypeOrmConfig())],
    controllers: [],
    providers: []
})
export class DatabaseModule {}
