import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsOptional,
  IsNumber,
  Min,
  IsDateString,
  IsString,
  IsIn,
} from 'class-validator';
import { PaginationDefaults } from '../commonenum/enum';

export class paginationDTO {
  @ApiProperty({ default: PaginationDefaults.OFFSET })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  offset: number = PaginationDefaults.OFFSET;

  @ApiProperty({ default: PaginationDefaults.LIMIT })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit: number = PaginationDefaults.LIMIT;

   @Transform(({ value }) => value === '' ? undefined : value)
  @IsOptional()
  @IsString()
  search: string 

   @Transform(({ value }) => value === '' ? undefined : value)
  @IsOptional()
  @IsDateString()
  startDate?: string;

   @Transform(({ value }) => value === '' ? undefined : value)
  @IsOptional()
  @IsDateString()
  endDate?: string;





  
}
