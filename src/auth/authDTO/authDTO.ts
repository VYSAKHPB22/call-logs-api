import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, min, minLength, MinLength } from 'class-validator';

export class companyregisterationDTO {
  @IsNotEmpty()
  @ApiProperty()
  company_name: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsEmail()
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
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}

export class tokenDTO {
  @ApiProperty()
  @IsNotEmpty()
  refresh_token: string;
}

export class employeeregisterationDTO {
  @IsNotEmpty()
  @ApiProperty()
  employee_name: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsEmail()
  employee_email: string;

  @IsNotEmpty()
  @ApiProperty()
  @MinLength(10)
  employee_phone: string;

  @IsNotEmpty()
  @ApiProperty()
  company_code: string;

  @IsNotEmpty()
  @ApiProperty()
  @MinLength(8)
  password: string;
}
