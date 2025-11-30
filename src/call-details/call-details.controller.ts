import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CallDetailsService } from './call-details.service';
import { calldetailsmultipleDTO } from './DTO/call.DTO';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Call Details')
@Controller('call-details')
export class CallDetailsController {
  constructor(private readonly callDetailsService: CallDetailsService) {}

  @Post('add')
   @ApiOperation({ summary: 'Post call logs  as bulk' })
  async Addcalldetails(@Body() callDTO: calldetailsmultipleDTO): Promise<any> {
 
    
    try {
      const result = await this.callDetailsService.Addcalldetails(callDTO);

      return {
        message: 'Call details added successfully',
        result: result,
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get('call')
   @ApiOperation({ summary: 'Fetch the call logs ' })
  async getcalldetails(): Promise<any> {
    try {
      const result = await this.callDetailsService.getcalldetails();

      return {
        message: 'Call details fetched successfully',
        result: result,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get('call/:date')
   @ApiOperation({ summary: 'Fetch call logs of a specific date ' })
  async getcalldetailsofday(@Param('date') date: string): Promise<any> {
    try {
      const result = await this.callDetailsService.getcalldetailsofday(date);

      return {
        message: 'Call details fetched successfully',
        result: result,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw error;
    }
  }
}
