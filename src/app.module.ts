import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigOrmService } from './config-orm/config-orm.service';
import { UserModule } from './model/user/user.module';
import { CustomerModule } from './model/customer/customer.module';
import { ExpertModule } from './model/expert/expert.module';
import { MaintenanceModule } from './model/maintenance/maintenance.module';
import { RequestServiceModule } from './model/request-service/request-service.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
  imports: [DatabaseModule, UserModule, CustomerModule, ExpertModule, MaintenanceModule, RequestServiceModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, ConfigOrmService],
})
export class AppModule { 
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('');
  }
}
