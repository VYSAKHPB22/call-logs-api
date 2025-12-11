import { Module } from '@nestjs/common';
import { CallDataService } from './call_data.service';
import { CallDataController } from './call_data.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CallLogSchema } from 'src/entity/call.schema';
import { employeeDetailsSchema } from 'src/entity/employee.schema';
import { CompanyDetailsSchema } from 'src/entity/company.schema';

@Module({
  imports: [MongooseModule.forFeature([ { name: 'call-details', schema: CallLogSchema },
       { name: 'employee', schema: employeeDetailsSchema },
       { name: 'company', schema: CompanyDetailsSchema }
  ])],
  controllers: [CallDataController],
  providers: [CallDataService],
})
export class CallDataModule {}
