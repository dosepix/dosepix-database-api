import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';

// Modules
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DosimetersModule } from './dosimeters/dosimeters.module';
import { MeasurementsModule } from './measurements/measurements.module';

// Entities
import { User } from './users/user.entity';
import { Dosimeter } from './dosimeters/dosimeter.entity';
import { Measurement } from './measurements/measurement.entity';
import { PointsModule } from './points/points.module';
import { Point } from './points/point.entity';

// https://docs.nestjs.com/techniques/database
@Module({
  imports: [
    // Uses ormconfig.json
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'test',
      password: 'test',
      database: 'test',
      entities: [User, Dosimeter, Measurement, Point],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    DosimetersModule,
    MeasurementsModule,
    PointsModule],
  controllers: [AppController],
  providers: [],
})

export class AppModule {
  constructor(private connection: Connection) {}
}
