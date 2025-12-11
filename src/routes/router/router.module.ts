import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { profile } from 'console';
import { AuthModule } from 'src/auth/auth.module';
import { CallDataModule } from 'src/company/call-data/call_data.module';
import { ProfileModule } from 'src/company/profile/profile.module';
import { employeeCallDetailsModule } from 'src/employees/call-details/call-details.module';
import { employeeProfileModule } from 'src/employees/profile/profile.module';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'api',
        children: [
          {
            path: 'auth',
            module: AuthModule,
          },

          {
            path: 'company',
            children: [
              {
                path: 'profile',
                module: ProfileModule,
              },
              {
                path: 'call-data',
                module: CallDataModule,
              }
            ],
          },

          {
            path: 'employees',
            children: [
              {
                path: 'call-details',
                module: employeeCallDetailsModule,
              },
               {
                path: 'profile',
                module: employeeProfileModule,
              },
            ],
          },
          // other routes can be added here like common etc
        ],
      },
    ]),
  ],
})
export class AppRouterModule {}
