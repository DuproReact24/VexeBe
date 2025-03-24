import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TwilioServiceService } from './twilio-service/twilio-service.service';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true
  })],
  controllers: [AppController],
  providers: [AppService, TwilioServiceService],
})
export class AppModule {}
