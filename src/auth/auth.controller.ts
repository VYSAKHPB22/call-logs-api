import {
  Body,
  Controller,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { companyregisterationDTO, employeeregisterationDTO, loginDTO, tokenDTO } from './authDTO/authDTO';

@ApiTags('Authentication')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register/company')
  @ApiOperation({ summary: 'register company ' })
  async registercompany(
    @Body(ValidationPipe) registerationDTO: companyregisterationDTO,
  ): Promise<any> {
    try {
      const result =
        await this.authService.companyRegistration(registerationDTO);
      return {
        message: 'Company registerd sucessfully',
        result: result,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw error;
    }
  }


    @Post('register/employee')
  @ApiOperation({ summary: 'register employee ' })
  async registerEmployee(
    @Body(ValidationPipe) employeeregisterationDTO:employeeregisterationDTO ,
  ): Promise<any> {
    try {
      const result =
        await this.authService.employeeRegistration(employeeregisterationDTO);
      return {
        message: 'Employee registerd sucessfully',
        result: result,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw error;
    }
  }

  @Post('companylogin')
  @ApiOperation({ summary: 'Sign in with  company details ' })
  async signup(@Body(ValidationPipe) LoginDTO: loginDTO): Promise<any> {
    try {
      const result = await this.authService.companysignUp(LoginDTO);
      return {
        message: 'Company logged in successfully',
        result: result,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw error;
    }
  }


   @Post('employeelogin')
  @ApiOperation({ summary: 'Sign in with  employee details ' })
  async login(@Body(ValidationPipe) LoginDTO: loginDTO): Promise<any> {
    try {
      const result = await this.authService.employeesignUp(LoginDTO);
      return {
        message: 'Employee logged in successfully',
        result: result,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw error;
    }
  }
  
   @Post('refresh-token')
  @ApiOperation({ summary: 'Refreshing point  of tokens' })
  async  RefreshToken(@Body(ValidationPipe) TokenDto:tokenDTO):Promise<any>{  {

   try {
     const result=await this.authService.refreshTokens(TokenDto);
     return{
      message:'Token Refreshed Sucessfully',
      result:result,
      statusCode:HttpStatus.OK
     }
   } catch (error) {
    
    throw error
   }
  }
  

}
}
