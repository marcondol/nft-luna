import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/mint")
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }

  @Get("/suply")
  async supply(): Promise<any> {
    return this.appService.getHello();
  }
}
