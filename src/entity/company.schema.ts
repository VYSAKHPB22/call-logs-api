import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

@Schema({
  id: true,
  timestamps: true,
})
export class CompanyDetails {
  @ApiProperty()
  @Prop({ required: true })
  company_name: string;
  @ApiProperty()
  @Prop({ required: true ,lowercase:true,unique:true})
  company_email: string;
  @ApiProperty()
  @Prop({ required: true })
  password: string;

  @ApiProperty()
  @Prop({ required: true })
  company_phone: string;

  @Prop({ required: true, unique: true })
  companyCode: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'employee' }], default: [] })
  company_members: [];
}

export const CompanyDetailsSchema =
  SchemaFactory.createForClass(CompanyDetails);
