import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt' ) {

    constructor (/*private readonly authService: AuthService*/) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'este-es-el-SEED-de-desarrollo'
        });
    }

    async validate(payload, done: Function){
        try {
            done(null, payload)
        } catch (error) {
            throw new UnauthorizedException('unauthorized', error.message);
        }
    }
}