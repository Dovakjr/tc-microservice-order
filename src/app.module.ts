import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeConfig } from './infrastructure/config/db.config';
import { OrdersModule } from './presentations/orders.module';

@Module({
  imports: [SequelizeModule.forRoot(sequelizeConfig), OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
