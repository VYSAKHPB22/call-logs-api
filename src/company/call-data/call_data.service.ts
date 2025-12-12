import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { calldetailsDTO } from './DTO/call.details.dto';
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
    const search = paginationDTO.search ? paginationDTO.search.trim() : null;
    if (search) {
      options.$or = [{ employee_name: new RegExp(search, 'i') }];
    }
    if (startDate || endDate) {
      options['log_date'] = {};

      if (startDate) {
        options.createdAt.$gte = new Date(startDate);
      }

      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        options['log_date'].$lte = end;
      }
    }

    const result = await this.calldetailsModel
      .find(options)

      .skip(offset)
      .limit(limit)
      .sort({ createdAt: 1 })
      .exec();
    const count = await this.calldetailsModel.countDocuments(options);
    if (!result) {
      throw new NotFoundException(
        'Error fetching call details or no records found',
      );
    }

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
    calldetailsDto: calldetailsDTO,
  ): Promise<any> {
    const checkemployee = await this.employeeModel.findById(id);
    if (!checkemployee) {
      throw new NotFoundException('Employee not found');
    }

    const inputDate = new Date(calldetailsDto.log_date);

    const start = new Date(inputDate.setHours(0, 0, 0, 0));

    const end = new Date(inputDate.setHours(23, 59, 59, 999));
    const result = await this.calldetailsModel
      .findOne({
        employee_id: checkemployee._id,
        log_date: { $gte: start, $lte: end },
      })
      .exec();
  

    if (!result) {
      throw new NotFoundException(
        'Error fetching call details or no records found for the specified date',
      );
    }
    return result;
  }
}
