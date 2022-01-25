import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'El servidor se encuentra en ejecucion';
  }
}
