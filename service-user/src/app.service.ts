import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';

@Injectable()
export class AppService {
  private client: Twilio;
  private verifyServiceSid: string;

  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    const accountSid = this.configService.get<string>('TWILIO_ACCOUNT_SID');
    const authToken = this.configService.get<string>('TWILIO_AUTH_TOKEN');
    this.verifyServiceSid = this.configService.get<string>('TWILIO_VERIFY_SERVICE_SID') ?? '';
    this.client = new Twilio(accountSid, authToken);
  }

  async sendOtp(phoneNumber: string) {
    console.log(phoneNumber)
    if (!phoneNumber.startsWith('+')) {
      phoneNumber = `+84${phoneNumber.slice(1)}`; 
    }
    try {
      const verification = await this.client.verify.v2.services(this.verifyServiceSid)
        .verifications.create({ to: phoneNumber, channel: 'sms' });

      console.log("✅ OTP Sent:", verification.sid);
      return { success: true, message: "success" };
    } catch (error) {
      console.error("❌ Twilio Error:", error);
      throw new Error(error.message || "Failed to send OTP");
    }
  }

  async verifyOtp(phoneNumber: string, otp: string): Promise<boolean> {
    console.log(1,{phoneNumber, otp})
 try {
  const verificationCheck = await this.client.verify.v2.services(this.verifyServiceSid)
  .verificationChecks.create({ to: `+${phoneNumber}`, code: otp });
console.log(verificationCheck)
return verificationCheck.status === "approved";
 } catch (error) {
  return false
 }
  }

  async processSignUp(data) {

    if (!data.form.phone.startsWith('+')) {
      data.form.phone = `+84${data.form.phone.slice(1)}`; 
    }

    
    const isOtpValid = await this.verifyOtp(data.form.phone,data.otp);

    if (!isOtpValid) {
      return 'so dien thoai k hop le';
    }
    if (! data.form.password) {
      throw new Error('Mật khẩu không được để trống');
    }
    const password =  data.form.password;

    data.form.password = await bcrypt.hash(password, 10);

    try {
      const result = await this.prismaService.customers.create({
        data:data.form,
      });

      return {success:true,
        result
      };
    } catch (error) {
      
      return {success:true,
        message:"vui long tao lai",
      };
    }
  }

  async processSignIn(data) {
    
    try {
      const result = await this.prismaService.customers.findFirst({
        where: {
          account: data.account,
        },
      });

      if (result) {
        const isMatch = await bcrypt.compare(data.password, result.password);
        if (!isMatch) {
          return "tài khoản or mật khẩu sai";
        } else {
          const payload = { sub: result.id, username: result.fullname, role: result.id_role };
          return {
            status:true,
            access_token: await this.jwtService.signAsync(payload),
            id:result.id,
            name:result.fullname
          };
        }
      }

      return result;
    } catch (error) {
      console.log(error);
      return "không tìm thấy tài khoản này";
    }
  }

  async processGetUser(data: any) {
  
    return this.prismaService.customers.findFirst({
      where: {
        id:data
      },
    select: {
    id: true,
    fullname: true, 
    phone: true,
    address: true
    }})
  }
  async processUpdate(data: any) {
  
    return this.prismaService.customers.update({
      where: {
        id:data.data.id
      },
        data:data.data
    })
  }
  
}
