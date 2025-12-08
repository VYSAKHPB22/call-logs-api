import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JwtPayload } from '../interface/jwtinterface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(jwtConfig.KEY)
    private jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,

      secretOrKeyProvider: (request, rawJwtToken, done) => {
        try {
          const decoded: any = JSON.parse(
            Buffer.from(rawJwtToken.split('.')[1], 'base64').toString(),
          );


           const isCompany = Boolean(decoded.companyCode);
    const isEmployee = Boolean(decoded.employeeCode);

    if (!isCompany && !isEmployee) {
      throw new UnauthorizedException('Invalid token payload');
    }

    const tokenType = isCompany ? 'company' : 'employee';


          const secret = this.jwtConfiguration[tokenType].access_secret;

          if (!secret) {
            return done(new UnauthorizedException('Invalid  secret'));
          }

          return done(null, secret);
        } catch (err) {
          return done(new UnauthorizedException('Invalid token'));
        }
      },
    });
  }

  async validate(payload: JwtPayload) {
  
    if (payload.companyCode) {
      return {
      _id: payload._id,
      company_name: payload.company_name,
      companyCode: payload.companyCode,
    };
  }
   
  
  if(payload.employeeCode){
        return {
      _id: payload._id,
      employee_name: payload.employee_name,
      employeeCode: payload.employeeCode,
        }
      }


      throw new UnauthorizedException('Invalid token payload');
  }
}
