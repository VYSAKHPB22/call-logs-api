import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { calldetailsmultipleDTO } from './DTO/call.DTO';
import { paginationDTO } from 'src/common/commonDTO/common.DTO';
import { off } from 'process';

@Injectable()
export class CallDetailsService {
  constructor(
    @InjectModel('call-details') private readonly calldetailsModel: Model<any>,
    @InjectModel('company') private readonly companyModel: Model<any>,
    @InjectModel('employee') private readonly employeeModel: Model<any>,
  ) {}

  async Addcalldetails(callDTO: calldetailsmultipleDTO): Promise<any> {
    const today = new Date();
    const date = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    let result;
    if (callDTO.doc_id) {
      const existinglog = await this.calldetailsModel.findById(callDTO.doc_id);
      if (!existinglog) {
        throw new NotFoundException('Call log not found');
      }
      existinglog.log.push(...callDTO.log);
      result = await existinglog.save();
      return result;
    } else {
      const checkemployee = await this.employeeModel.findById(
        callDTO.employee_id,
      );
      if (!checkemployee) {
        throw new NotFoundException('Employee not found');
      }

      const result = await this.calldetailsModel.create({
        employee_id: checkemployee._id,
        employee_name: checkemployee.employee_name,
        company_id: checkemployee.company_id,
        log_date: date,
        log: callDTO.log,
      });
      if (!result) {
        throw new InternalServerErrorException(
          'Failed to create call details or invalid data',
        );
      }
      await result.save();
         return result;
    }
 
  }

  // async getcalldetails(paginationDTO: paginationDTO): Promise<any> {
  //   const { offset, limit, startDate, endDate } = paginationDTO;

  //   const options: any = {};
  //   const search = paginationDTO.search ? paginationDTO.search.trim() : null;
  //   if (search) {
  //     options.$or = [
  //       { 'log.name': new RegExp(search, 'i') },
  //       { 'log.call_type': new RegExp(search, 'i') },
  //     ];
  //   }
  //   if (startDate || endDate) {
  //     options['log.date'] = {};

  //     if (startDate) {
  //       options.createdAt.$gte = new Date(startDate);
  //     }

  //     if (endDate) {
  //       const end = new Date(endDate);
  //       end.setHours(23, 59, 59, 999);
  //       options['log.date'].$lte = end;
  //     }
  //   }

  //   const result = await this.calldetailsModel
  //     .find(options)

  //     .skip(offset)
  //     .limit(limit)
  //     .sort({ createdAt: 1 })
  //     .exec();
  //   const count = await this.calldetailsModel.countDocuments(options);
  //   if (!result) {
  //     throw new NotFoundException(
  //       'Error fetching call details or no records found',
  //     );
  //   }

  //   return {
  //     result,
  //     pagination: {
  //       offset: offset,
  //       limit: limit,
  //       totalRecords: count,
  //     },
  //   };
  // }

  // async getcalldetailsofday(date: string): Promise<any> {
  //   const queryDate = new Date(date);
  //   const startOfDay = new Date(
  //     queryDate.getFullYear(),
  //     queryDate.getMonth(),
  //     queryDate.getDate(),
  //   );
  //   const endOfDay = new Date(
  //     queryDate.getFullYear(),
  //     queryDate.getMonth(),
  //     queryDate.getDate() + 1,
  //   );

  //   const result = await this.calldetailsModel
  //     .findOne({
  //       date: { $gte: startOfDay, $lt: endOfDay },
  //     })
  //     .exec();

  //   if (!result) {
  //     throw new NotFoundException(
  //       'Error fetching call details or no records found for the specified date',
  //     );
  //   }

  //   return result;
  // }
}
