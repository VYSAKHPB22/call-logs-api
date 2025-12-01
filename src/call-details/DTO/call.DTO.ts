import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDate,
  IsArray,
  ValidateNested,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CalldetailsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  number: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  call_type: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  duration: string;
}

export class calldetailsmultipleDTO {
  @IsOptional()
  @IsDateString()
  log_date?: string;

  @ApiProperty({ type: () => CalldetailsDto, isArray: true })
  @ValidateNested({ each: true })
  @Type(() => CalldetailsDto)
  @IsArray()
  log: CalldetailsDto[];
}
