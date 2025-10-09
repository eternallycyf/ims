import {
  BeforeApplicationShutdown,
  Global,
  Module,
  NestModule,
  OnApplicationBootstrap,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { APP_GUARD, APP_INTERCEPTOR, ModuleRef } from '@nestjs/core';
import { MiddlewareConsumer } from '@nestjs/common';
import { LogMiddleware } from './log.middleware';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';

@Module({
  imports: [PersonModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: LoginGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeInterceptor,
    },
  ],
})
export class AppModule
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    NestModule
{
  constructor(private moduleRef: ModuleRef) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes('aaa*');
  }

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
