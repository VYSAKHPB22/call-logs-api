import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { paginationDTO } from 'src/common/commonDTO/common.DTO';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel('company') private readonly companyModel: Model<any>,
  ) {}

  async getcompanydetails(company_id: string): Promise<any> {
    const result = await this.companyModel
      .findById(company_id)
      .select('-password').populate('company_members','employee_name employee_email employee_phone employeeCode')

      .exec();

    if (!result) {
      throw new NotFoundException(
        'Error fetching company details or no records found',
      );
    }

    return result;
  }
}
