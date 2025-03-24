import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private prismaService:PrismaService

  ) {}

  @EventPattern('save_history')
   handleSave(@Payload() data) {
    
    try {
      return this.prismaService.history_ticket.create({data}) 
    } catch (error) {
      console.log(error)
    }
  }
  @MessagePattern('service_history')
  handleGet(@Payload() data){
    return this.prismaService.history_ticket.findMany({
      where:{
        customer_id:+data
      }
    }) 
  }

}
