import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyDetailsSchema } from 'src/entity/company.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'company', schema: CompanyDetailsSchema }]),
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
