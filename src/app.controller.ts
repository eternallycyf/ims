import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { PersonService } from './person/person.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Inject('person')
  // private person: PersonService;
}
