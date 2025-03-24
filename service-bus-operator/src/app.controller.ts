import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
   
  ) {}
  @MessagePattern('create_bus')
   handlePostBus(@Payload() data) {
    const data1 =  this.appService.processCreateBusop(data)
    return data1
  }
  @MessagePattern('update_bus')
  handleUpdateBus(@Payload() data) {
    
    return this.appService.processUpdateBusop(data)
  }
  @MessagePattern('delete_bus')
  handleDeleteBus(@Payload() data) {
    
    return this.appService.processDeletedBusop(+data)
  }




// rent-driver
  @MessagePattern('create_rent')
   handlePostRent(@Payload() data) {
    const data1 =  this.appService.processCreateRent(data)
    return data1
  }
  @MessagePattern('update_rent')
  handleUpdateRent(@Payload() data) {
    
    return this.appService.processUpdateRent(data)
  }
  @MessagePattern('delete_rent')
  handleDeleteRent(@Payload() data) {
    
    return this.appService.processUpdateRent(data)
  }
  @MessagePattern('get_rent')
  handleGetRent() {
    
    return  this.appService.processGetRent()
  }



  // trip

  @MessagePattern('get_trip')
  handleGetTrip() {
    
    return  this.appService.processGetRent()
  }

  @MessagePattern('create_trip')
  handleCreateTrip(@Payload() data) {
    
    return  this.appService.processCreateTrip(data)
  }

  @MessagePattern('delete_trip')
  handleDeleteTrip(@Payload() data) {
    
    return  this.appService.processDeleteTrip(data)
  }


  /// local
  @MessagePattern('create_local')
  handleCreateLocal(@Payload() data) {
    
    return  this.appService.processCreateLocal(data)
  }



  @MessagePattern('get_bus')
  handleGet(){
    
    return this.appService.processBus()
  }
  @MessagePattern('get_bus_detail')
  handleGetDetail(@Payload() id){
   
    return this.appService.processBusDetail(+id)
  }
  
  @MessagePattern('update_trip')
  handleUpdateTrip(@Payload() data){
    console.log(data)
   
    return this.appService.processUpdateTrip(data)
  }
  

}
