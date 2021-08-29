import { Body, Controller, Delete, Get, Param, Post, Put, Request,
    NotFoundException, BadRequestException, UseGuards, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { QueryDto } from './dto/query.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async find( @Query() queryDto: QueryDto ) {
        try {
            if(Object.keys(queryDto).length != 0) {
                var userQuery = await this.usersService.query(queryDto);
                if (userQuery != undefined) {
                    return userQuery;
                }
                throw new NotFoundException();
            }
            return this.usersService.findAll();
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException("Queried user not found");
            } else {
                throw new BadRequestException("Provided query has wrong shape");
            }
        }
    }

    @Get('/:id')
    async findOne(@Param('id') id: number): Promise<User> {
        return this.usersService.findOne(id);
    }

    @Post()
    async create(@Body('user') userData: UserDto) {
        await this.usersService.create(userData).catch((error) => {
            throw new BadRequestException("User already existing");
        });
    }

    @Put()
    async update(@Body('user') user: User): Promise<void> {
        this.usersService.update(user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        if(id != req.user.id) {
            throw new BadRequestException('id mismatch');
        }
        const result = await this.usersService.remove(id)
        console.log(req.user);
        if (result.affected === 0) {
            throw new BadRequestException('User could not be deleted');
        }
    }
}
