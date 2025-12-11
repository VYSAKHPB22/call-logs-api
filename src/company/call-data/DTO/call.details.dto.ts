import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class calldetailsDTO {
 
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  log_date: string;
}
