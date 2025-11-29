import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { calldetailsmultipleDTO } from './DTO/call.DTO';

@Injectable()
export class CallDetailsService {
  constructor(
    @InjectModel('call-details') private readonly calldetailsModel: Model<any>,
  ) {}

  async Addcalldetails(callDTO: calldetailsmultipleDTO): Promise<any> {
    const today = new Date();
    const date = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );

    const result = await new this.calldetailsModel({
      date,
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

  async getcalldetails(): Promise<any> {
    const result = await this.calldetailsModel.find();
    if (!result) {
      throw new NotFoundException(
        'Error fetching call details or no records found',
      );
    }

    return result;
  }

  async getcalldetailsofday(date: string): Promise<any> {
    const queryDate = new Date(date);
    const startOfDay = new Date(
      queryDate.getFullYear(),
      queryDate.getMonth(),
      queryDate.getDate(),
    );
    const endOfDay = new Date(
      queryDate.getFullYear(),
      queryDate.getMonth(),
      queryDate.getDate() + 1,
    );

    const result = await this.calldetailsModel
      .findOne({
        date: { $gte: startOfDay, $lt: endOfDay },
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
