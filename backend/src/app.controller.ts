import {
  BeforeApplicationShutdown,
  Controller,
  Get,
  Inject,
  OnApplicationBootstrap,
  OnModuleDestroy,
  OnModuleInit,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { PersonService } from './person/person.service';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';

@Controller()
// @UseInterceptors(TimeInterceptor)
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
  // @UseGuards(LoginGuard)
  // @UseInterceptors(TimeInterceptor)
  getHello(): string {
    return this.appService.getHello();
  }

  // @Inject('person')
  // private person: PersonService;
}
