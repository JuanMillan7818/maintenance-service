import { Controller, Get } from '@nestjs/common';
import { ApiHeader, ApiInternalServerErrorResponse, ApiOkResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Description } from './util/descriptions/descriptions';

@ApiHeader({
  name: 'x-api-key',
  description: Description.header
})
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOkResponse({description: Description.ok})
  @ApiInternalServerErrorResponse({description: Description.error_internal})
  getApp(): string {    
    return this.appService.getHello();
  }
}
