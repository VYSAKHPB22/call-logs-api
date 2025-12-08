import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { employeeDetailsSchema } from 'src/entity/employee.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
        
          { name: 'employee', schema: employeeDetailsSchema },
       ]),
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class employeeProfileModule {}
