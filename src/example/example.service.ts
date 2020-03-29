import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Example } from './example.entity';
import { getConnection } from 'typeorm';

@Injectable()
export class ExampleService extends TypeOrmCrudService<
  Example
> {
  constructor(@InjectRepository(Example) repo) {
    super(repo);
  }
}
