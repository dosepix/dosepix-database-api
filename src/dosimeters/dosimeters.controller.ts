import { Body, Controller, Delete, Get, Param, Post, Put, Request,
    NotFoundException, BadRequestException, UseGuards, Query } from '@nestjs/common';
import { DosimetersService } from './dosimeters.service';
import { DosimeterDto } from './dto/dosimeter.dto';
import { QueryDto } from './dto/query.dto';

import { Roles } from '../guard/roles.decorator';
import { Role } from '../guard/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../guard/roles.guard';

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
    async create(@Body('dosimeter') dosimeterData: DosimeterDto, @Request() req) {
        console.log(req.body);
        console.log(dosimeterData);
        await this.dosimetersService.create(dosimeterData).catch((error) => {
            console.log(error);
            if (error.code === 'ER_NO_DEFAULT_FOR_FIELD') {
                throw new BadRequestException("No data provided");
            } else {
                throw new BadRequestException("Dosimeter already existing");
            }
        });
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        // Only admin should be able to delete a dosimeter
        /*
        if(id != req.user.id) {
            throw new BadRequestException('User not authorized');
        }
        */ 
        const result = await this.dosimetersService.remove(id)
        if (result.affected === 0) {
            throw new BadRequestException('Dosimeter could not be removed');
        }
    }
}
