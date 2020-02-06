import { Injectable } from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-google-oauth20';
import { AuthService, Provider } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    
    constructor( private readonly authService: AuthService) {
        super({
            clientID    : '728747448016-5j6fo9kqgr1g4759mqg3fhbn902v9u7l.apps.googleusercontent.com',
            clientSecret: 'UKyVIv-NdrYwqWUr-E68Wams',
            callbackURL : 'http://localhost:3000/auth/google/callback',
            passReqToCallback: true,
            scope: ['profile']
        })
    }


    async validate(request: any, accesToken: string, refreshToken: string, profile, done: Function) {
        try {
            console.log(profile);

            const jwt: string = await this.authService.validateOAuthLogin(profile.id, Provider.GOOGLE)

            const user = {
                jwt
            }

            done(null, user);
        } catch(err) {
            // console.log(err);
            done(err, false)
        }
    }
}