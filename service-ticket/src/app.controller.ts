import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    

  ) {}

  @MessagePattern('book_ticket')
  handleBook(@Payload() data) {

    return this.appService.processBook(data);
  }
  @MessagePattern('get_ticket')
  hanldeget(@Payload() data) {

    return this.appService.processGet(+data);
  }
  @MessagePattern('update_ticket')
  handleUpdate(@Payload() data) {

    return this.appService.processUpdate(data.id,data.data);
  }
  @MessagePattern('delete_ticket')
  handleDelete(@Payload() data) {

    return this.appService.processDelete(+data);
  }
  @MessagePattern('get_ticketAll')
  handleGetQuery(@Payload() data) {
    

    return this.appService.processQuery(data);
  }
}
