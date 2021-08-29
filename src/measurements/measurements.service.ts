import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Measurement } from './measurement.entity';
import { MeasurementDto } from './dto/measurement.dto';
import { MeasurementIdDto } from './dto/measurementid.dto';
import { QueryDto } from './dto/query.dto';

// Services
import { UsersService } from '../users/users.service';
import { DosimetersService } from '../dosimeters/dosimeters.service';

@Injectable()
export class MeasurementsService {
    constructor(
        @InjectRepository(Measurement)
        private measurementRepository: Repository<Measurement>,
        private usersService: UsersService,
        private dosimetersService: DosimetersService,
    ) {}

    async create(measurementData: MeasurementDto): Promise<Measurement> {
        const newMeasurement = this.measurementRepository.create(measurementData);
        return this.measurementRepository.save(newMeasurement);
    }

    async createId(measurementData: MeasurementIdDto): Promise<Measurement> {
        const user = await this.usersService.findOne(measurementData.userId);
        const dosimeter = await this.dosimetersService.findOne(measurementData.dosimeterId);

        if (user === undefined && dosimeter === undefined) {
            throw "User and dosimeter not existing";
        }

        if (user === undefined) {
            throw "User not existing";
        }

        if (dosimeter === undefined) {
            throw "Dosimeter not existing";
        }

        const newDto = new MeasurementDto();
        newDto.dosimeter = dosimeter;
        newDto.user = user;
        const newMeasurement = this.measurementRepository.create(newDto);
        return this.measurementRepository.save(newMeasurement);
    }

    update(measurement: Measurement): Promise<void> {
        this.measurementRepository.save(measurement);
        return;
    }

    findOne(id: number): Promise<Measurement> {
        return this.measurementRepository.findOne( {id: id} );
    }
    
    async query(query: QueryDto): Promise<Measurement[]> {
        const newDto = new MeasurementDto();
        if (query.dosimeterId) {
            newDto.dosimeter = await this.dosimetersService.findOne(query.dosimeterId);
        }

        if (query.userId) {
            newDto.user = await this.usersService.findOne(query.userId);
        }

        return this.measurementRepository.find( newDto );
    }
}
