import {
  Entity,
  Column,
  BeforeInsert,
  OneToOne,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '../base.entity';
import uuid = require('uuid');
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';
import { Type } from 'class-transformer';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('examples')
export class Example extends BaseEntity {
  @ApiModelPropertyOptional()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column({ type: 'varchar' })
  title: string;

  @ApiModelPropertyOptional()
  @IsOptional({ always: true })
  @Column({ type: 'varchar' })
  description: string;

  @ApiModelPropertyOptional()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column({ type: 'simple-array' })
  actions: string[];

  @ApiModelPropertyOptional()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column()
  created_by_id: string;

  @ApiModelPropertyOptional()
  @IsOptional({ always: true })
  @Column({ type: 'json', nullable: true })
  meta_created_by: any;

  @ApiModelPropertyOptional()
  @IsOptional({ always: true })
  @Column({ type: 'json', nullable: true })
  meta: any;

  @BeforeInsert()
  protected beforeInsert(): void {
    this.id = uuid.v4();
  }
}
