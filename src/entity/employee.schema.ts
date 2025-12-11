import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

@Schema({
  id: true,
  timestamps: true,
})
export class employeeDetails {
  @ApiProperty()
  @Prop({ required: true })
  employee_name: string;
  @ApiProperty()
  @Prop({ required: true, lowercase: true, unique: true })
  employee_email: string;
  @ApiProperty()
  @Prop({ required: true })
  password: string;

  @ApiProperty()
  @Prop({ required: true })
  employee_phone: string;

  @Prop({ required: true })
  companyCode: string;
  @Prop({ required: true, unique: true })
  employeeCode: string;

  @Prop({ type: Types.ObjectId, ref: 'company', required: true })
company_id: Types.ObjectId;

}

export const employeeDetailsSchema =
  SchemaFactory.createForClass(employeeDetails);
