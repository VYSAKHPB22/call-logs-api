import { Module } from '@nestjs/common';
import { CallDetailsService } from './call-details.service';
import { CallDetailsController } from './call-details.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {  CallLogSchema } from 'src/entity/call.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name:'call-details',schema:CallLogSchema},
   
      
    ]),
  ],
  controllers: [CallDetailsController],
  providers: [CallDetailsService],
})
export class CallDetailsModule {}
