import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('send_otp')
  async sendOtp(@Body() phoneNumber) {
    console.log("controll",phoneNumber)
    return this.appService.sendOtp(phoneNumber);
  }

 
  @MessagePattern("auth_up")
  handleSignUp(@Payload() data) {
    return this.appService.processSignUp(data)
  }

  @MessagePattern("auth_in")
  handleSignIn(@Payload() data) {
 
    return this.appService.processSignIn(data)
  }
  // @MessagePattern("get_user")
  // handleGetUser(@Payload() data) {
  //   console.log("data",data)

  //   return this.appService.processGetUser("hi")
  // }
  @MessagePattern("get_user")
  handleGetUser(@Payload() data) {


    return this.appService.processGetUser(+data)
  }
  
  @MessagePattern("update_user")
  handleUpdate(@Payload() data) {
 

    return this.appService.processUpdate(data)
  }
}
