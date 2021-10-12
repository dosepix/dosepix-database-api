import { Body, Controller, Delete, Get, Param, Post, Put, Request,
    NotFoundException, BadRequestException, UseGuards, Query } from '@nestjs/common';
import { Point } from './point.entity';
import { PointDto } from './dto/point.dto';
import { PointIdDto } from './dto/pointId.dto';
import { QueryDto } from './dto/query.dto';
import { PointsService } from './points.service';

@Controller('points')
export class PointsController {
    constructor(
        private readonly pointsService: PointsService
        ) {}

    // @UseGuards(JwtAuthGuard)
    @Get()
    async find( @Query() queryDto: QueryDto, @Request() req ) {
        console.log(queryDto);
        if (queryDto.measurementId === undefined) {
            throw new BadRequestException("No measurement provided");
        }

        // Get measurement from id
        // Fails, if measurement does not exist anymore. TODO: ensure it does not happen!
        /*
        var userId = (await this.pointsService.getMeasurement(queryDto.measurementId)).user.id;

        if (userId != req.user.id) {
            throw new BadRequestException("Unauthorized user");
        }
        */
    
        if (Object.keys(queryDto).length != 0) {
            var pointQuery = await this.pointsService.query(queryDto);
            if (pointQuery != undefined) {
                return pointQuery;
            }
            throw new NotFoundException("Queried point not found");
        } else {
            throw new BadRequestException("Provided query has wrong shape");
        }
    }

    @Post()
    async create(@Body('point') pointData: PointIdDto) {
        await this.pointsService.createId(pointData).catch(
            (error) => {
                console.log(error);
                throw new NotFoundException(error);
            }
        );
    }

}
