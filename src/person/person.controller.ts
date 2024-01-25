import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UploadedFiles,
  UseInterceptors,
  Inject,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('api/person')
export class PersonController {
  // constructor(private readonly personService: PersonService) {}
  // constructor(@Inject('person_service') private readonly personService) {}

  // @Inject(PersonService) private personService: PersonService;
  @Inject('person_service') private personService: PersonService;

  @Inject('person') private readonly person: { name: string; age: number };
  @Inject('person4')
  private readonly person4: { name: string; age: number };
  @Inject('person3')
  private readonly person3: {
    name: string;
    desc: string;
    Personservice: PersonService;
  };
  @Inject('person5')
  private readonly person5: { name: string; desc: string };

  @Get(':id')
  findOne(@Param('id') id: number) {
    console.log(this);
    return this.personService.findOne(id);
  }

  @Get('')
  findAll(@Query('name') name: string, @Query('age') age: string) {
    return this.personService.findAll(name, age);
  }

  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personService.remove(+id);
  }

  @Post('file')
  @UseInterceptors(AnyFilesInterceptor({ dest: 'uploads/' }))
  file(
    @Body() createPersonDto: CreatePersonDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    console.log(files);
    return `received: ${JSON.stringify(createPersonDto)}`;
  }
}
