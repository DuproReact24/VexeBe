import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';

@Injectable()
export class TwilioServiceService {
    private client: Twilio;
    private verifyServiceSid: string;
  
    constructor(private configService: ConfigService) {
        const accountSid = this.configService.get<string>('TWILIO_ACCOUNT_SID');
        console.log(accountSid, typeof accountSid)
        const authToken = this.configService.get<string>('TWILIO_AUTH_TOKEN');
        this.verifyServiceSid = this.configService.get<string>('TWILIO_VERIFY_SERVICE_SID')??'';
        this.client = new Twilio(accountSid, authToken)
        
    }
  
    async sendOtp(phoneNumber: string) {
     
     
        try {
          const verification = await this.client.verify.v2.services(this.verifyServiceSid)
            .verifications.create({ to: phoneNumber, channel: 'sms' });
      
          console.log("✅ OTP Sent:", verification.sid);
          return verification;
        } catch (error) {
          console.error("❌ Twilio Error:", error);
          throw new Error(error.message || "Failed to send OTP");
        }
      }
      
  
    async verifyOtp(phoneNumber: string, otp: string): Promise<boolean> {
      const verificationCheck = await this.client.verify.v2.services(this.verifyServiceSid)
        .verificationChecks.create({ to: phoneNumber, code: otp });
  
      return verificationCheck.status === "approved";
    }
}
