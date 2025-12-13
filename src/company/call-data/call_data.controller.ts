import { Body, Controller, Get, HttpStatus, Param, Query, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { CallDataService } from './call_data.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { paginationDTO } from 'src/common/commonDTO/common.DTO';
import { use } from 'passport';
import { JwtcompanyGuard } from 'src/auth/gaurds/jwt.companygaurd';
import { validate } from 'class-validator';

@ApiBearerAuth()
@ApiTags('Company - call Logs')
@UseGuards(JwtcompanyGuard)
@Controller()
export class CallDataController {
  constructor(private readonly callDataService: CallDataService) {}



    @Get()
   @ApiOperation({ summary: 'Fetch call logs  of company ' })
  async getcalldetailsofcompany(@Query(ValidationPipe)paginationDTO:paginationDTO,@Req()req:any): Promise<any> {
    try {
       const company_id = req.user._id;
      const result = await this.callDataService.getcalldetailsofcompany(paginationDTO,company_id);

      return {
        message: 'Company call logs fetched successfully',
        result: result,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw error;
    }
  }


    
  @Get(':id')
   @ApiOperation({ summary: 'Fetch call logs  by employee id  ' })
  async getcalldetailsofday(@Param('id')id:string,@Query(ValidationPipe)paginationDTO:paginationDTO): Promise<any> {
    try {
   
      const result = await this.callDataService.getcalldetailsofday(id,paginationDTO);

      return {
        message: 'Employee call logs fetched successfully',
        result: result,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      throw error;
    }
  }
}
