import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExampleController } from './example.controller';
import { ExampleService } from './example.service';
import { Example } from './example.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Example])],

  providers: [ExampleService],

  controllers: [ExampleController],
})
export class ExampleModule {}
