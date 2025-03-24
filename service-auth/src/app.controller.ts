import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @MessagePattern('auth-validate')
  async handleAuth(@Payload() data){
    
    return await this.appService.validate(data)
  }

}
