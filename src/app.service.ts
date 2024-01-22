import { Inject, Injectable } from '@nestjs/common';
import { PersonService } from './person/person.service';

@Injectable()
export class AppService {
  @Inject(PersonService)
  private PersonService: PersonService;

  getHello(): string {
    return this.PersonService.injectFn();
  }
}
