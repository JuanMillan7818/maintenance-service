import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    
    validateApiKey(apikey: string): boolean {
        return (process.env.API_KEY === apikey);
    }
}
