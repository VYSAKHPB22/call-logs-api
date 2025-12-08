import { Controller, Get, HttpStatus, Query, Req, UseGuards, ValidationPipe } from '@nestjs/common';

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtEmployeeGuard } from 'src/auth/gaurds/jwt.usergaurd';
import { paginationDTO } from 'src/common/commonDTO/common.DTO';
import { ProfileService } from './profile.service';

@ApiBearerAuth()
@ApiTags('Employee - Profile')
@UseGuards(JwtEmployeeGuard)
@Controller()

export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('profile-details')
       @ApiOperation({ summary: 'Fetch the employee details ' })
      async getcalldetails(@Query(ValidationPipe)paginationDTO:paginationDTO,@Req()req:any): Promise<any> {
        try {
          const employee_id=req.user._id
          const result = await this.profileService.getemployeedetails(employee_id,paginationDTO);
    
          return {
            message: 'Profile details fetched successfully',
            result: result,
            statusCode: HttpStatus.OK,
          };
        } catch (error) {
          throw error;
        }
      }
}



