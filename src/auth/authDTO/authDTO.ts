import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, min, minLength, MinLength } from 'class-validator';

export class registerationDTO {
  @IsNotEmpty()
  @ApiProperty()
  company_name: string;

   @IsNotEmpty()
  @ApiProperty()
  company_email: string;

   @IsNotEmpty()
  @ApiProperty()
  @MinLength(10)
  company_phone: string;

  @IsNotEmpty()
  @ApiProperty()
  @MinLength(8)
  password: string;
}


export class loginDTO {
    @IsNotEmpty()
    @ApiProperty()
    company_email: string;
    @IsNotEmpty()
    @ApiProperty()
    password: string;
}