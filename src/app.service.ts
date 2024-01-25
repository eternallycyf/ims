import { Inject, Injectable } from '@nestjs/common';
import { PersonService } from './person/person.service';

@Injectable()
export class AppService {
  @Inject('person_service')
  private PersonService: PersonService;

  getHello(): string {
    return this.PersonService.injectFn();
  }
}
