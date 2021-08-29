import { Body, Controller, Delete, Get, Param, Post, Put, Request,
    NotFoundException, BadRequestException, UseGuards, Query } from '@nestjs/common';
import { DosimetersService } from './dosimeters.service';
import { DosimeterDto } from './dto/dosimeter.dto';
import { QueryDto } from './dto/query.dto';

@Controller('dosimeters')
export class DosimetersController {
    constructor(private readonly dosimetersService: DosimetersService) {}

    @Get()
    async find( @Query() queryDto: QueryDto ) {
        try {
            if(Object.keys(queryDto).length != 0) {
                var dosimeterQuery = await this.dosimetersService.query(queryDto);
                if (dosimeterQuery != undefined) {
                    return dosimeterQuery;
                }
                throw new NotFoundException();
            }
            return this.dosimetersService.findAll();
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException("Queried dosimeter not found");
            } else {
                throw new BadRequestException("Provided query has wrong shape");
            }
        }
    }

    @Post()
    async create(@Body('dosimeter') dosimeterData: DosimeterDto) {
        await this.dosimetersService.create(dosimeterData).catch((error) => {
            if (error.code === 'ER_NO_DEFAULT_FOR_FIELD') {
                throw new BadRequestException("No data provided");
            } else {
                throw new BadRequestException("Dosimeter already existing");
            }
        });
    }
}
