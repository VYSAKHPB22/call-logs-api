import {
  Controller,
  Get,
  HttpStatus,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { paginationDTO } from 'src/common/commonDTO/common.DTO';
import { JwtcompanyGuard } from 'src/auth/gaurds/jwt.companygaurd';
@ApiBearerAuth()
@ApiTags('Company - Profile')
@Controller()
@UseGuards(JwtcompanyGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('profile-details')
  @ApiOperation({ summary: 'Fetch the company details ' })
  async getcalldetails(
    @Query(ValidationPipe) paginationDTO: paginationDTO,
    @Req() req: any,
  ): Promise<any> {
    try {
      const company_id = req.user._id;
      const result = await this.profileService.getcompanydetails(
        company_id,
        paginationDTO,
      );

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
