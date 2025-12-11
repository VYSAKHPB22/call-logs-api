import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

@Schema({
  id: true,
  timestamps: true,
})
export class CallDetails {
  @ApiProperty()
  @Prop({ required: true })
  phone_number: string;
  @ApiProperty()
  @Prop({ required: true })
  name: string;
  @ApiProperty()
  @Prop({ required: true })
  call_type: string;
  @ApiProperty()
  @Prop({ required: true })
  date: Date;
  @ApiProperty()
  @Prop({ required: true })
  duration: string;
}

export const CallDetailsSchema = SchemaFactory.createForClass(CallDetails);

@Schema({
  timestamps: true,
})
export class CallLog {
  @Prop({ type: Types.ObjectId, ref: 'company', required: true })
  employee_id: Types.ObjectId;

  @Prop({ required: true })
  employee_name: string;
  @Prop({ type: Types.ObjectId, ref: 'company', required: true })
  company_id: Types.ObjectId;
  @ApiProperty()
  @Prop({ required: true })
  log_date: Date;
  @ApiProperty({ type: () => CallDetails, isArray: true })
  @Prop({ type: [CallDetailsSchema], default: [] })
  log: CallDetails[];
}

export const CallLogSchema = SchemaFactory.createForClass(CallLog);
