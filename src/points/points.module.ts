import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';


// Point
import { PointsService } from './points.service';
import { PointsController } from './points.controller';
import { Point } from './point.entity';
import { MeasurementsModule } from '../measurements/measurements.module';

@Module({
  imports: [TypeOrmModule.forFeature([Point]), MeasurementsModule],
  providers: [PointsService],
  exports: [PointsService],
  controllers: [PointsController],
})
export class PointsModule {}
