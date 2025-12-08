import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { paginationDTO } from 'src/common/commonDTO/common.DTO';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel('company') private readonly companyModel: Model<any>,
  ) {}

  async getcompanydetails(
    company_id: string,
    paginationDTO: paginationDTO,
  ): Promise<any> {
    const { offset, limit } = paginationDTO;

    const options: any = {
      _id: new Types.ObjectId(company_id),
    };

    const search = paginationDTO.search ? paginationDTO.search.trim() : null;
    if (search) {
      options.$or = [
        { company_name: new RegExp(search, 'i') },
        { company_email: new RegExp(search, 'i') },
      ];
    }

    const result = await this.companyModel
      .find(options).select('-password')

      .skip(offset)
      .limit(limit)
      .sort({ createdAt: 1 })
      .exec();
    const count = await this.companyModel.countDocuments(options);
    if (!result) {
      throw new NotFoundException(
        'Error fetching company details or no records found',
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
}
