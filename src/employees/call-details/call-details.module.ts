import { Module } from '@nestjs/common';
import { CallDetailsService } from './call-details.service';
import { CallDetailsController } from './call-details.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CallLogSchema } from 'src/entity/call.schema';
import { employeeDetailsSchema } from 'src/entity/employee.schema';
import { CompanyDetailsSchema } from 'src/entity/company.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'call-details', schema: CallLogSchema },
      { name: 'employee', schema: employeeDetailsSchema },
      { name: 'company', schema: CompanyDetailsSchema },
    ]),
  ],
  controllers: [CallDetailsController],
  providers: [CallDetailsService],
})
export class employeeCallDetailsModule {}
