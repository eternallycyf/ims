import {
  BeforeApplicationShutdown,
  Inject,
  Injectable,
  OnApplicationBootstrap,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PersonService } from './person/person.service';

@Injectable()
export class AppService
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown
{
  onModuleInit() {
    console.log('OnAppServeModuleInit');
  }

  onApplicationBootstrap() {
    console.log('OnAppServeApplicationBootstrap');
  }

  onModuleDestroy() {
    console.log('OnAppServeModuleDestroy');
  }

  beforeApplicationShutdown() {
    console.log('beforeApplicationShutdown');
  }

  @Inject('person_service')
  private PersonService: PersonService;

  getHello(): string {
    return this.PersonService.injectFn();
  }
}
