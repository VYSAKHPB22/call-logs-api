import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { paginationDTO } from 'src/common/commonDTO/common.DTO';

@Injectable()
export class CallDataService {
  constructor(
    @InjectModel('call-details') private readonly calldetailsModel: Model<any>,
    @InjectModel('employee') private readonly employeeModel: Model<any>,
    @InjectModel('company') private readonly companyModel: Model<any>,
  ) {}

  async getcalldetailsofcompany(
    paginationDTO: paginationDTO,
    company_id: string,
  ): Promise<any> {
    const { offset, limit, startDate, endDate } = paginationDTO;

    const options: any = {};
    options.company_id = company_id;
    const search = paginationDTO.search ? paginationDTO.search.trim() : null;
    if (search) {
      options.$or = [{ employee_name: { $regex: search, $options: 'i' } }];
    }
    if (startDate || endDate) {
      const dateFilter: any = {};

      if (startDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        dateFilter.$gte = start;
      }

      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        dateFilter.$lte = end;
      }

      options.log_date = dateFilter;
    }

    const result = await this.calldetailsModel
      .find(options)

      .skip(offset)
      .limit(limit)
      .sort({ log_date: -1 })
      .exec();
    const count = await this.calldetailsModel.countDocuments(options);

    return {
      result,
      pagination: {
        offset: offset,
        limit: limit,
        totalRecords: count,
      },
    };
  }

  async getcalldetailsofday(
    id: string,
    paginationDTO: paginationDTO,
  ): Promise<any> {
    const { offset, limit, startDate, endDate } = paginationDTO;

    const checkemployee = await this.employeeModel.findById(id);
    if (!checkemployee) {
      throw new NotFoundException('Employee not found');
    }

    const options: any = {};
    options.company_id = checkemployee.company_id;
    options.employee_id = checkemployee._id;
    const search = paginationDTO.search ? paginationDTO.search.trim() : null;
    if (search) {
      options.$or = [{ employee_name: { $regex: search, $options: 'i' } }];
    }
    if (startDate || endDate) {
      const dateFilter: any = {};

      if (startDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        dateFilter.$gte = start;
      }

      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        dateFilter.$lte = end;
      }

      options.log_date = dateFilter;
    }

    const result = await this.calldetailsModel
      .find(options)

      .skip(offset)
      .limit(limit)
      .sort({ log_date: -1 })
      .exec();
    const count = await this.calldetailsModel.countDocuments(options);
    return {
      result,
      pagination: {
        offset: offset,
        limit: limit,
        totalRecords: count,
      },
    };
  }
}
