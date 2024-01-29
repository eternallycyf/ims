import {
  BeforeApplicationShutdown,
  Global,
  Module,
  OnApplicationBootstrap,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { ModuleRef } from '@nestjs/core';

@Module({
  imports: [PersonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown
{
  constructor(private moduleRef: ModuleRef) {}

  onModuleInit() {
    console.log('OnAppModuleInit');
  }

  onApplicationBootstrap() {
    console.log('OnAppModuleApplicationBootstrap');
  }

  onModuleDestroy() {
    console.log('OnAppModuleDestroy');
  }

  beforeApplicationShutdown(signal: string) {
    const appService = this.moduleRef.get<AppService>(AppService);
    console.log('beforeApplicationShutdown', signal);
  }
}
