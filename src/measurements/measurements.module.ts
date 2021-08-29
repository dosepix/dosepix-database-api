import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { DosimetersModule } from '../dosimeters/dosimeters.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { DosimetersService } from '../dosimeters/dosimeters.service';
import { MeasurementsService } from './measurements.service';
import { MeasurementsController } from './measurements.controller';
import { Measurement } from './measurement.entity';

@Module({
  imports: [UsersModule, DosimetersModule,
    TypeOrmModule.forFeature([Measurement])],
  providers: [MeasurementsService],
  exports: [MeasurementsService],
  controllers: [MeasurementsController]
})
export class MeasurementsModule {}
