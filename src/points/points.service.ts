import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Point } from './point.entity';
import { PointDto } from './dto/point.dto';
import { PointIdDto } from './dto/pointId.dto';
import { QueryDto } from './dto/query.dto';

// Services
import { MeasurementsService } from '../measurements/measurements.service';
import { Measurement } from '../measurements/measurement.entity';

@Injectable()
export class PointsService {
    constructor(
        @InjectRepository(Point)
        private pointRepository: Repository<Point>,
        private measurementsService: MeasurementsService,
    ) {}

    async create(pointData: PointDto): Promise<Point> {
        const newPoint = this.pointRepository.create(pointData);
        return this.pointRepository.save(newPoint);
    }

    async createId(pointData: PointIdDto): Promise<Point> {
        console.log(pointData);
        const measurement = await this.measurementsService.findOne(pointData.measurementId);

        if (measurement === undefined) {
            throw "Measurement not existing";
        }

        const newDto = {...pointData, ...new PointDto()};
        newDto.measurement = measurement;
        const newPoint = this.pointRepository.create(newDto);
        return this.pointRepository.save(newPoint);
    }

    findOne(id: number):
    Promise<Point> {
        return this.pointRepository.findOne( {id: id} );
    }

    async getMeasurement(id: number): Promise<Measurement> {
        return this.measurementsService.findOne(id);
    }

    async query(query: QueryDto): Promise<Point[]> {
        const newDto = new PointDto();
        if (query.measurementId) {
            newDto.measurement = await this.measurementsService.findOne(query.measurementId);
        }

        return this.pointRepository.find( newDto );
    }
}
