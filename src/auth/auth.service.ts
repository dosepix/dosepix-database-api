import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.getByNamePwd(username);
        if (user && await bcrypt.compare(password, user.password)) {
            console.log("Successful login!");
            // return user without password
            const {password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = {
            sub: user.id,
            username: user.name,
            role: user.role,
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
