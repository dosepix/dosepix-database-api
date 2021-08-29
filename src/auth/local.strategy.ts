import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    console.log(`User ${username} tries to log in`);
    const user = await this.authService.validateUser(username, password);
    if (!user) {
        console.log(`Error: user could not be verified!`);
        throw new UnauthorizedException();
    }
    return user;
  }
}
