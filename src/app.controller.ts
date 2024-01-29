import {
  BeforeApplicationShutdown,
  Controller,
  Get,
  Inject,
  OnApplicationBootstrap,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { AppService } from './app.service';
import { PersonService } from './person/person.service';

@Controller()
export class AppController
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown
{
  constructor(private readonly appService: AppService) {}

  onModuleInit() {
    console.log('OnAppControllerModuleInit');
  }

  onApplicationBootstrap() {
    console.log('OnAppControllApplicationBootstrap');
  }

  onModuleDestroy() {
    console.log('OnAppControllerModuleDestroy');
  }

  beforeApplicationShutdown() {
    console.log('beforeApplicationShutdown');
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Inject('person')
  // private person: PersonService;
}
