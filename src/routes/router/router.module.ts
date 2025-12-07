import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from 'src/auth/auth.module';
import { ProfileModule } from 'src/company/profile/profile.module';
import { CallDetailsModule } from 'src/employees/call-details/call-details.module';

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
            ],
          },

          {
            path: 'employees',
            children: [
              {
                path: 'call-details',
                module: CallDetailsModule,
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
