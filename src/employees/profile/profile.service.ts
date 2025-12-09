import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import path from 'path';
import { paginationDTO } from 'src/common/commonDTO/common.DTO';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel('employee') private readonly employeeModel: Model<any>,
  ) {}

  async getemployeedetails(employee_id: string): Promise<any> {
    const result = await this.employeeModel
      .findById(employee_id)
      .select('-password')

      .exec();

    if (!result) {
      throw new NotFoundException(
        'Error fetching employee details or no records found',
      );
    }

    return result;
  }
}
