import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject,  Param,  Post, Put, Query, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    @Inject("service-user") private userService: ClientProxy,

    @Inject('service-bus-operator') private busOpService:ClientProxy,
    @Inject('service-ticket') private ticketService:ClientProxy,
    @Inject('service-momo') private momoService:ClientProxy,
    @Inject('service-history') private historyService:ClientProxy
  ) {}

  @Get('get-user/:id')
  getUser(@Param('id') id){
    const result = lastValueFrom(this.userService.send('get_user',id))
    return result
  }
  @Put('update-user')
  update(@Body() data){
    const result = lastValueFrom(this.userService.send('update_user',data))
    return result
  }

  @Post('sign-up')
  async apiSignUp(@Body() data) {
    console.log("gateway",data)

    let signUpResult =await lastValueFrom(this.userService.send('auth_up',data))

    return signUpResult
    

  }
  @Post('send-otp')
  async apiSendSms(@Body() data) {
    console.log(data)

    let signUpResult =await lastValueFrom(this.userService.send('send_otp',data.phone))

    return signUpResult
    

  }
  @Post('sign-in')
  async apiSignIn(@Body() data) {
 

    let signUpResult =await lastValueFrom(this.userService.send('auth_in',data))

    return signUpResult
    

  }
  @Post('admin/bus-operator')
    async apicreateAdminBus(@Body() data){

      let result = await lastValueFrom(this.busOpService.send('create_Adbus',data))
      return result
    
    }

    @Post('admin/create-bus-operator')
    async apicreateBus(@Body() data){

      let result = await lastValueFrom(this.busOpService.send('create_bus',data))
      
      if(result.status == 400){
        throw new HttpException(`${result.error.meta.target}`,HttpStatus.BAD_REQUEST)
      }
      return result
    
    }
    @Put('admin/update-bus-operator/:id')
    async apiUpdateBus(@Body() data,@Param('id') id){
      

      const payload = { data,id}
      let result = await lastValueFrom(this.busOpService.send('update_bus',payload))
   
      if(result.status == 400){
        throw new HttpException(`${result.error.meta.cause}`,HttpStatus.BAD_REQUEST)
      }
      return result
    
    }
    @Delete('admin/delete-trips/:id')
    async apiDeleteBus(@Param('id') id){
      console.log(id)
      let result = await lastValueFrom(this.busOpService.send('delete_bus',id))
      if(result.status == 400){
        throw new HttpException(`${result.error.meta.cause}`,HttpStatus.FORBIDDEN)
      }
      return result
    }
    @Get('get-bus')
   async apiGetBus(){
      const result = await this.busOpService.send('get_bus',"")

      return result
    }


    // ----
    @Post('admin/create-rent')
    async apicreateRent(@Body() data){

      let result = await lastValueFrom(this.busOpService.send('create_rent',data))
      
      if(result.status == 400){
        throw new HttpException(`${result.error.meta.target}`,HttpStatus.BAD_REQUEST)
      }
      return result
    
    }
    @Put('admin/update-rent/:id')
    async apiUpdateRent(@Body() data,@Param('id') id){
      

      const payload = { data,id}
      let result = await lastValueFrom(this.busOpService.send('update_rent',payload))
   
      if(result.status == 400){
        throw new HttpException(`${result.error.meta.cause}`,HttpStatus.BAD_REQUEST)
      }
      return result
    
    }
    @Delete('admin/delete-rent')
    async apiDeleteRent(@Query('busId') data){
      let result = await lastValueFrom(this.busOpService.send('delete_rent',data))
      if(result.status == 400){
        throw new HttpException(`${result.error.meta.cause}`,HttpStatus.FORBIDDEN)
      }
      return result
    }
    @Get('admin/get-rent')
    async apiGetRent(){
      const result = await this.busOpService.send('get_rent',"")

      return result
    }
    

    @Post('admin/create-trip')
    async apiCreateTrip(@Body() data){

      let result = await lastValueFrom(this.busOpService.send('create_trip',data))
      
      if(result.status == 400){
        throw new HttpException(`hihi`,HttpStatus.BAD_REQUEST)
      }
      return result
    
    }


    @Post('admin/get-trip')
    async apiGetTrip(@Body() data){

      let result = await lastValueFrom(this.busOpService.send('create_trip',data))
      
      if(result.status == 400){
        throw new HttpException(`hihi`,HttpStatus.BAD_REQUEST)
      }
      return result
    
    }

    @Delete('admin/de-trip/:id')
    apiDeleteTrip(@Param('id') id){
      

      const result = lastValueFrom(this.busOpService.send('delete_trip',+id))
      return result

    }


    // local v0
    @Post('admin/create-local')
    apiCreateLocal(@Body() body){

      const result = lastValueFrom(this.busOpService.send('create_local',body))
      return result

    }


    @Get('get-bus/:id')
    apigetBusDetail(@Param('id') id){
      const result = lastValueFrom(this.busOpService.send('get_bus_detail',id))
      return result
    }


    @Post('book-ticket')
    apiCreateTicket(@Body() body){
   
     try {
      const result = lastValueFrom(this.ticketService.send('book_ticket',body))
    return result 
    } catch (error) {
      console.log(error)
     }
    

     
  }
  @Get('get-ticket/:id')
    apigetTicket(@Param('id') id){

    
     try {
      const result = lastValueFrom(this.ticketService.send('get_ticket',id))
    return result 
    } catch (error) {
 
     }
    

     
  }
  @Get('get-trips')
  apigetTicketAll(@Query('from') from,@Query('to') to,@Query('date') date,){

    const payload = {
      from,to,date
    }
console.log({
  from,to,date
})
   try {
    const result = lastValueFrom(this.ticketService.send('get_ticketAll',payload))
  return result 
  } catch (error) {

   }
  

   
}
  @Get('get-Delete/:id')
    apiDelete(@Param('id') id){

    
     try {
      const result = lastValueFrom(this.ticketService.send('delete_ticket',id))
    return result 
    } catch (error) {
 console.log(error)
     }
    

     
  }
  @Put('update-ticket/:id')
    apiUpdate(@Param('id') id,@Body() data){

    
     try {
      const result = lastValueFrom(this.ticketService.send('update_ticket',{id,data}))
    return result 
    } catch (error) {
 
     }
    

     
  }
  @Put('update-trip/:id')
  apiUpdateTrip(@Param('id') id,@Body() data){

    
   try {
    const result = lastValueFrom(this.busOpService.send('update_trip',{id,data}))
  return result 
  } catch (error) {

   }
  

   
}
  @Post('pay')
  apiMomo(@Query('amount') amount){
    try {
      const result = lastValueFrom(this.momoService.send('service_momo',amount))
    return result 
    } catch (error) {
    
     }
  }

  @Get('get-history/:id')
  apiGethistory(@Param('id') id){
    const result = lastValueFrom(this.historyService.send('service_history',id))
    return result 
  }

}
