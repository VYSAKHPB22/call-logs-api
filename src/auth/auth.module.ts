import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyDetailsSchema } from 'src/entity/company.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JwtStrategy } from './statergy/jwt.statergy';
import { employeeDetailsSchema } from 'src/entity/employee.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'company', schema: CompanyDetailsSchema },
       { name: 'employee', schema: employeeDetailsSchema },
    ]),

    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [jwtConfig.KEY],
      useFactory: (jwtConfiguration: ConfigType<typeof jwtConfig>) => ({
        secret: jwtConfiguration.default.secret,
        signOptions: { expiresIn: jwtConfiguration.default.expiry as any },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
