import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Dosimeter } from './dosimeter.entity';
import { DosimeterDto } from './dto/dosimeter.dto';
import { QueryDto } from './dto/query.dto';

@Injectable()
export class DosimetersService {
    constructor(
        @InjectRepository(Dosimeter)
        private dosimeterRepository: Repository<Dosimeter>,
    ) {}

    async create(dosimeterData: DosimeterDto): Promise<Dosimeter> {
        const newDosimeter = this.dosimeterRepository.create(dosimeterData);
        return this.dosimeterRepository.save(newDosimeter);
    }

    update(dosimeter: Dosimeter): Promise<void> {
        this.dosimeterRepository.save(dosimeter);
        return;
    }

    async remove(id: number): Promise<DeleteResult> {
        const result = this.dosimeterRepository.delete(id);
        return result;
    }

    findAll(): Promise<Dosimeter[]> {
        return this.dosimeterRepository.find();
    }

    findOne(id: number): Promise<Dosimeter> {
        return this.dosimeterRepository.findOne( {id: id});
    }

    async query(query: QueryDto): Promise<Dosimeter> {
        return this.dosimeterRepository.findOne( query );
    }
}
