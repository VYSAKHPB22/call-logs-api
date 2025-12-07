import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CodeGeneratorUtil } from 'src/common/utiility/company,code.utl';
import * as bcrypt from 'bcrypt';
import { loginDTO } from './authDTO/authDTO';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('company') private readonly companyModel: Model<any>,
    private readonly codeGeneratorUtil: CodeGeneratorUtil,
       @Inject(jwtConfig.KEY)
    private jwtConfiguration: ConfigType<typeof jwtConfig>,
    private jwtservice: JwtService,
  ) {}

  async companyRegistration(registrationdto): Promise<any> {
    let compcode = this.codeGeneratorUtil.generateCompanyCode(
      registrationdto.company_name,
      'CMP_',
    );



   const existingCompany = await this.companyModel.findOne({
  $or: [
    { company_email: registrationdto.company_email },
    { company_phone: registrationdto.company_phone },
  ],
});

if (existingCompany) {
  if (existingCompany.company_email === registrationdto.company_email) {
    throw new ConflictException('Email is already registered');
  }
  if (existingCompany.company_phone === registrationdto.company_phone) {
    throw new ConflictException('Phone number is already registered');
  }
}

    const hashpassword = await bcrypt.hash(registrationdto.password, 8);

    const companyDetails = await this.companyModel.create({
      company_name: registrationdto.company_name,
      password: hashpassword,
      company_email: registrationdto.company_email,
      company_phone: registrationdto.company_phone,
      companyCode: compcode,
      company_members: [],
    });
 
  }

  async companysignUp(loginDTO:loginDTO): Promise<any> {
  

    const checkcompany = await this.companyModel.findOne({
      company_email: loginDTO.company_email,
    });
    if (!checkcompany) {
      throw new ConflictException('Company not found, please register first');
    }

   const passwordmatch = await bcrypt.compare(loginDTO.password, checkcompany.password);
    if (!passwordmatch) {
      throw new UnauthorizedException('invalid credentials');
    }


      const payload = {
  _id: checkcompany._id,
      company_name: checkcompany.company_name,
      companyCode: checkcompany.companyCode,
    };

    const Access_token =await this.jwtservice.sign(payload, {
            secret: this.jwtConfiguration.admin.access_secret,
            expiresIn: Number(this.jwtConfiguration.expires.access),
          })

          
   const Refresh_token=await this.jwtservice.sign(payload, {
      secret: this.jwtConfiguration.admin.refresh_secret,
      expiresIn: Number(this.jwtConfiguration.expires.refresh),
    })

return { Access_token: Access_token, Refresh_token: Refresh_token };
}



}
