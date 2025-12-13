import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CallDetailsService } from './call-details.service';
import { calldetailsmultipleDTO } from './DTO/call.DTO';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { paginationDTO } from 'src/common/commonDTO/common.DTO';
import { JwtEmployeeGuard } from 'src/auth/gaurds/jwt.usergaurd';

@ApiTags('Employee - Call Details')
@ApiBearerAuth()
@UseGuards(JwtEmployeeGuard)
@Controller()
export class CallDetailsController {
  constructor(private readonly callDetailsService: CallDetailsService) {}

  @Post('add')
   @ApiOperation({ summary: 'Post call logs  as bulk' })
  async Addcalldetails(@Body() callDTO: calldetailsmultipleDTO,@Req()req:any): Promise<any> {
 
    
    try {
      const employee_id = req.user._id
      const result = await this.callDetailsService.Addcalldetails(callDTO,employee_id);

      return {
        message: 'Call details added successfully',
        result: result,
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      throw error;
    }
  }

  // @Get('call')
  //  @ApiOperation({ summary: 'Fetch the call logs ' })
  // async getcalldetails(@Query(ValidationPipe)paginationDTO:paginationDTO): Promise<any> {
  //   try {
  //     const result = await this.callDetailsService.getcalldetails(paginationDTO);

  //     return {
  //       message: 'Call details fetched successfully',
  //       result: result,
  //       statusCode: HttpStatus.OK,
  //     };
  //   } catch (error) {
  //     throw error;
  //   }
  // }

//   @Get('call/:id')
//    @ApiOperation({ summary: 'Fetch call logs  by employee id  ' })
//   async getcalldetailsofday(@Param('id') id: string): Promise<any> {
//     try {
//       const result = await this.callDetailsService.getcalldetailsofday(id);

//       return {
//         message: 'Call details fetched successfully',
//         result: result,
//         statusCode: HttpStatus.OK,
//       };
//     } catch (error) {
//       throw error;
//     }
//   }
}
