import { Body, Controller, Delete, Get, Param, Post, Put, Request,
    NotFoundException, BadRequestException, UseGuards, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { QueryDto } from './dto/query.dto';

import { Roles } from '../guard/roles.decorator';
import { Role } from '../guard/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../guard/roles.guard';
import { adminToken } from '../auth/constants';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async find( @Query() queryDto: QueryDto) {
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
        console.log(userData);
        await this.usersService.create(userData).catch((error) => {
            switch(error.code) {
                case "ER_NO_DEFAULT_FOR_FIELD":
                    throw new BadRequestException("Fields are missing or false");
                case "ER_DUP_ENTRY":
                    throw new BadRequestException("User already existing");
                default:
                    throw new BadRequestException(error);
            }
        });
    }

    @Post('admin')
    async createAdmin(@Body('admin') userData: UserDto, @Request() req) {
        var authHeader = req.headers.authorization;
        if (!authHeader.startsWith("Bearer ")) {
            throw new BadRequestException('Please provide correct token!');
        }

        var token = authHeader.substring(7, authHeader.length);
        if (token != adminToken) {
            throw new BadRequestException('Please provide correct token!');
        }

        console.log('Create admin');
        await this.usersService.createAdmin(userData).catch((error) => {
            switch(error.code) {
                case "ER_NO_DEFAULT_FOR_FIELD":
                    throw new BadRequestException("Fields are missing or false");
                case "ER_DUP_ENTRY":
                    throw new BadRequestException("User already existing");
                default:
                    throw new BadRequestException(error);
            }
        });
    }

    @Put()
    async update(@Body('user') user: User): Promise<void> {
        this.usersService.update(user);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        // TODO: Admin shouldn't be able to delete himself!
        /*
        // Not required for admin, allowd to delete everyone
        if(id != req.user.id) {
            throw new BadRequestException('id mismatch');
        }
        */
        const result = await this.usersService.remove(id)
        console.log(req.user);
        if (result.affected === 0) {
            throw new BadRequestException('User could not be deleted');
        }
    }
}
