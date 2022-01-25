import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy) {
    constructor(private authService: AuthService) {
        super({ header: 'x-api-key', prefix: ''}, true, (apikey, done) => {
            const key = authService.validateApiKey(apikey);
            if(!key) {
                return done(false);
            }
            return done(true);
        })
    }
}