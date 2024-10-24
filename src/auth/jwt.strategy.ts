import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Token } from './@interfaces/interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('token'),
      secretOrKey: process.env.JWT_SECRET
    });
  }
  validate(token: Token) {
    const userExists = this.authService.userExists(token.id);

    if (!userExists) {
      throw new UnauthorizedException('User not found');
    }

    return token;
  }
}
