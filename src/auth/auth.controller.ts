import {
  Body,
  Controller,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { loginDTO, registerationDTO } from './authDTO/authDTO';
@ApiTags('Authentication')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'register company ' })
  async registercompany(
    @Body(ValidationPipe) registerationDTO: registerationDTO,
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

  @Post('login')
  @ApiOperation({ summary: 'Sign-up company ' })
  async signup(@Body(ValidationPipe) LoginDTO: loginDTO): Promise<any> {
    try {
      const result = await this.authService.companysignUp(LoginDTO);
      return {
        message: 'User registerd sucessfully',
        result: result,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw error;
    }
  }
}
