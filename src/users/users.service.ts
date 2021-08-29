import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import QueryDto from './dto/query.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async create(userData: UserDto): Promise<User> {
        const newUser = this.usersRepository.create(userData);
        return this.usersRepository.save(newUser);
    }

    update(user: User): Promise<void> {
        this.usersRepository.save(user);
        return;
    }

    async remove(id: number): Promise<DeleteResult> {
        const result = this.usersRepository.delete(id);
        return result;
    }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(id: number): Promise<User> {
        return this.usersRepository.findOne( {id: id});
    }

    async query(query: QueryDto): Promise<User> {
        return this.usersRepository.findOne( query );
    }

    // Get user by name and additionally return password
    // IMPORTANT: Only use to verify user! Do not make public in controller!
    async getByNamePwd(name: string): Promise<User> {
        return this.usersRepository.createQueryBuilder("user").
            where("user.name = :userName", {userName: name}).
            addSelect("user.password").
            getOne();
    }
}
