import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { TwilioServiceService } from './twilio-service/twilio-service.service';
;

@Controller()
export class AppController {

  constructor(private readonly appService: AppService,
    private config:ConfigService,
    private readonly twilioService: TwilioServiceService
  ) {}

  @Post("send-otp")
  async sendOtp(@Body("phone") phone: string) {
    const sid = await this.twilioService.sendOtp(phone);
    return { message: "OTP sent successfully!", sid };
  }
}
