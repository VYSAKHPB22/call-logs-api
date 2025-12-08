import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CodeGeneratorUtil } from 'src/common/utiility/company,code.utl';
import * as bcrypt from 'bcrypt';
import { loginDTO, tokenDTO } from './authDTO/authDTO';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import e from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('company') private readonly companyModel: Model<any>,
    @InjectModel('employee') private readonly employeeModel: Model<any>,
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

  async companysignUp(loginDTO: loginDTO): Promise<any> {
    const checkcompany = await this.companyModel.findOne({
      company_email: loginDTO.email,
    });
    if (!checkcompany) {
      throw new NotFoundException('Company not found, please register first');
    }

    const passwordmatch = await bcrypt.compare(
      loginDTO.password,
      checkcompany.password,
    );
    if (!passwordmatch) {
      throw new UnauthorizedException('invalid credentials');
    }

    const payload = {
      _id: checkcompany._id,
      company_name: checkcompany.company_name,
      companyCode: checkcompany.companyCode,
    };

    const Access_token = await this.jwtservice.sign(payload, {
      secret: this.jwtConfiguration.company.access_secret,
      expiresIn: Number(this.jwtConfiguration.expires.access),
    });

    const Refresh_token = await this.jwtservice.sign(payload, {
      secret: this.jwtConfiguration.company.refresh_secret,
      expiresIn: Number(this.jwtConfiguration.expires.refresh),
    });

    return { Access_token: Access_token, Refresh_token: Refresh_token };
  }

  async employeeRegistration(employeeregistrationdto): Promise<any> {
    let empcode = this.codeGeneratorUtil.generateCompanyCode(
      employeeregistrationdto.employee_name,
      'EMP_',
    );

    const existingemployee = await this.employeeModel.findOne({
      $or: [
        { employee_email: employeeregistrationdto.employee_email },
        { employee_phone: employeeregistrationdto.employee_phone },
      ],
    });

    if (existingemployee) {
      if (
        existingemployee.employee_email ===
        employeeregistrationdto.company_email
      ) {
        throw new ConflictException('Email is already registered');
      }
      if (
        existingemployee.employee_phone ===
        employeeregistrationdto.company_phone
      ) {
        throw new ConflictException('Phone number is already registered');
      }
    }

    const hashpassword = await bcrypt.hash(employeeregistrationdto.password, 8);

    const employeeDetails = await this.employeeModel.create({
      employee_name: employeeregistrationdto.employee_name,
      password: hashpassword,
      employee_email: employeeregistrationdto.employee_email,
      employee_phone: employeeregistrationdto.employee_phone,
      companyCode: employeeregistrationdto.company_code,
      employeeCode: empcode,
    });

    const checkcompany = await this.companyModel.findOneAndUpdate(
      { companyCode: employeeDetails.companyCode },
      { $addToSet: { company_members: employeeDetails._id } },
      { new: true },
    );
    if (!checkcompany) {
      throw new NotFoundException(
        'Associated company not found.please check company code',
      );
    }
  }

  async employeesignUp(loginDTO: loginDTO): Promise<any> {
    const checkemployee = await this.employeeModel.findOne({
      employee_email: loginDTO.email,
    });
    if (!checkemployee) {
      throw new NotFoundException('Employee not found, please register first');
    }

    const passwordmatch = await bcrypt.compare(
      loginDTO.password,
      checkemployee.password,
    );
    if (!passwordmatch) {
      throw new UnauthorizedException('invalid credentials');
    }

    const payload = {
      _id: checkemployee._id,
      employee_name: checkemployee.employee_name,
      employeeCode: checkemployee.employeeCode,
    };

    const Access_token = await this.jwtservice.sign(payload, {
      secret: this.jwtConfiguration.employee.access_secret,
      expiresIn: Number(this.jwtConfiguration.expires.access),
    });

    const Refresh_token = await this.jwtservice.sign(payload, {
      secret: this.jwtConfiguration.employee.refresh_secret,
      expiresIn: Number(this.jwtConfiguration.expires.refresh),
    });

    return { Access_token: Access_token, Refresh_token: Refresh_token };
  }

  async refreshTokens(TokenDto: tokenDTO): Promise<any> {
    const { refresh_token } = TokenDto;

    const decoded: any = JSON.parse(
      Buffer.from(refresh_token.split('.')[1], 'base64').toString(),
    );
    if (!decoded) {
      throw new UnauthorizedException('invalid  token');
    }

    const isCompany = Boolean(decoded.companyCode);
    const isEmployee = Boolean(decoded.employeeCode);

    if (!isCompany && !isEmployee) {
      throw new UnauthorizedException('Invalid token payload');
    }

    const tokenType = isCompany ? 'company' : 'employee';
    console.log('Token Type:', tokenType);

    const refreshSecret = this.jwtConfiguration[tokenType].refresh_secret;
    console.log(refreshSecret, 'token secret');

    let payload;
    try {
      payload = this.jwtservice.verify(refresh_token, {
        secret: refreshSecret,
      });
    } catch (error) {
      throw new UnauthorizedException('invalid or malformed refresh token');
    }

    const accessSecret = this.jwtConfiguration[tokenType].access_secret;

    const newRefreshSecret = this.jwtConfiguration[tokenType].refresh_secret;

    let newPayload: any = {
      _id: payload._id,
    };

    if (isCompany) {
      newPayload.company_name = payload.company_name;
      newPayload.companyCode = payload.companyCode;
    }

    if (isEmployee) {
      newPayload.employee_name = payload.employee_name;
      newPayload.employeeCode = payload.employeeCode;
    }

    const newAccessToken = this.jwtservice.sign(newPayload, {
      secret: accessSecret,
      expiresIn: Number(this.jwtConfiguration.expires.access),
    });

    const newRefreshToken = this.jwtservice.sign(newPayload, {
      secret: newRefreshSecret,
      expiresIn: Number(this.jwtConfiguration.expires.refresh),
    });

    return {
      access_token: newAccessToken,
      refresh_token: newRefreshToken,
    };
  }
}
