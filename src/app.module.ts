import { Module } from '@nestjs/common';
import { DataModule } from './data/data.module';
import { AssetsModule } from './assets/assets.module';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from './assets/entities/asset.entity';
import { Datum } from './data/entities/datum.entity';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: 5432,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DB,
      entities: [Asset, Datum],
      synchronize: process.env.SYNC == 'true',
    }),
    DataModule,
    AssetsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
