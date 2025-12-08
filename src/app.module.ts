import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CallDetailsModule } from './employees/call-details/call-details.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import jwtConfig from './auth/config/jwt.config';
import { ProfileModule } from './company/profile/profile.module';
import { AppRouterModule } from './routes/router/router.module';
import { employeeProfileModule } from './employees/profile/profile.module';
import { HealthModule } from './health/health/health.module';



@Module({
  imports: [
        ConfigModule.forRoot({isGlobal:true,load: [jwtConfig]} ),
 MongooseModule.forRootAsync({
      imports: [ConfigModule], 
      inject: [ConfigService], 
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'), 
      }),
    }),
    
   
    
    AuthModule,CommonModule,ProfileModule,AppRouterModule, CallDetailsModule,employeeProfileModule,HealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
