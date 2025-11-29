import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({
  id: true,
  timestamps: true,
})
export class CallDetails {
  @ApiProperty()
  @Prop({ required: true })
  number: number;
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
  @ApiProperty()
  @Prop({ required: true })
  date: Date;
  @ApiProperty({ type: () => CallDetails, isArray: true })
  @Prop({ type: [CallDetailsSchema], default: [] })
  log: CallDetails[];
}

export const CallLogSchema = SchemaFactory.createForClass(CallLog);
