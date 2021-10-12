import { Body, Controller, Delete, Get, Param, Post, Put, Request,
    NotFoundException, BadRequestException, UseGuards, Query } from '@nestjs/common';
import { Measurement } from './measurement.entity';
import { MeasurementIdDto } from './dto/measurementid.dto';
import { QueryDto } from './dto/query.dto';
import { MeasurementsService } from './measurements.service';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('measurements')
export class MeasurementsController {
    constructor(private readonly measurementsService: MeasurementsService) {}

    // @UseGuards(JwtAuthGuard)
    @Get()
    async find( @Query() queryDto: QueryDto, @Request() req ) {
        if (queryDto.userId === undefined) {
            throw new BadRequestException("No user provided");
        }
        /*
        // TODO: Add authorization
        if (queryDto.userId != req.user.id) {
            throw new BadRequestException("Unauthorized user");
        }
        */

        if (Object.keys(queryDto).length != 0) {
            var measurementQuery = await this.measurementsService.query(queryDto);
            console.log(measurementQuery);
            if (measurementQuery != undefined) {
                return measurementQuery;
            }
            throw new NotFoundException("Queried measurement not found");
        } else {
            throw new BadRequestException("Provided query has wrong shape");
        }
    }

    @Put()
    async update(@Body('measurement') measurement: Measurement): Promise<void> {
        this.measurementsService.update(measurement);
    }

    @Post()
    async create(@Body('measurement') measurementData: MeasurementIdDto) {
        await this.measurementsService.createId(measurementData).catch((error) => {
            console.log(error);
            throw new NotFoundException(error);
        });
    }

    @Get('/:id')
    async findOne(@Param('id') id: number): Promise<Measurement> {
        return this.measurementsService.findOne(id);
    }
}
