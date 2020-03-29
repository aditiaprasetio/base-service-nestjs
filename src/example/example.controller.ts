import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Example } from './example.entity';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { ExampleService } from './example.service';

@Crud({
  model: {
    type: Example,
  },
  params: {
    id: {
      field: 'id',
      type: 'string',
      primary: true,
    },
  },
})
@ApiUseTags('Examples')
@Controller('examples')
@ApiBearerAuth()
export class ExampleController implements CrudController<Example> {
  constructor(public service: ExampleService) {}

  get base(): CrudController<Example> {
    return this;
  }
}
