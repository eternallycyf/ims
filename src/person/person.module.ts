import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { AppService } from 'src/app.service';

@Module({
  controllers: [PersonController],
  // providers: [PersonService],
  providers: [
    {
      provide: 'person_service',
      useClass: PersonService,
    },
    {
      provide: 'person',
      useValue: {
        name: 'zs',
        age: 12,
      },
    },
    {
      provide: 'person2',
      useFactory() {
        return {
          name: 'bbb',
          desc: 'cccc',
        };
      },
    },
    {
      provide: 'person3',
      useFactory(person: { name: string }, Personservice: PersonService) {
        return {
          name: person.name,
          desc: '213',
          Personservice,
        };
      },
      inject: ['person', 'person_service'],
    },
    {
      provide: 'person5',
      async useFactory() {
        await new Promise((resolve) => {
          setTimeout(resolve, 3000);
        });
        return {
          name: 'bbb',
          desc: 'cccc',
        };
      },
    },
    {
      provide: 'person4',
      useExisting: 'person2',
    },
  ],
  exports: ['person_service'],
})
export class PersonModule {}
