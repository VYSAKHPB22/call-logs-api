import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  company: {
    access_secret: process.env.JWT_COMPANY_ACCESS_SECRET_KEY,
    refresh_secret: process.env.JWT_COMPANY_REFRESH_SECRET,
  
  },

    employee: {
    access_secret: process.env.JWT_EMPLOYEE_ACCESS_SECRET_KEY,
    refresh_secret: process.env.JWT_EMPLOYEE_REFRESH_SECRET,

  },

  expires: {
    access: process.env.JWT_ACCESS_EXPIRY,
    refresh: process.env.JWT_REFRESH_EXPIRY,
  },

  default:{
    secret: process.env.JWT_SECRET,
    expiry:process.env.JWT_SECRET_EXPIRY
  }
}));