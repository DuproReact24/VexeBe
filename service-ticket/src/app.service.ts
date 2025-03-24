import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(private prismaService:PrismaService,
        @Inject('service_history') private historySerice:ClientProxy,
        @Inject('service_notify') private notify:ClientProxy
  ){}
 async processBook(res) {
  const {data,payinf} = res
  data.seat = JSON.stringify(data.seat)
  data.booking_time = new Date(data.booking_time).toISOString()
  const payload = {...data,id_busop:3}
  this.notify.emit('save_notify',{data,payinf})
   this.historySerice.emit('save_history',data)
  try {
    const data1 =  await this.prismaService.ticket_bookings.create({
      data:payload
    })
    return data1
  } catch (error) {
   console.log(error)
  }
  return ""

  }
  processGet(data){
    return this.prismaService.ticket_bookings.findMany({
      where:{
      id_busop:data
      },
      
      include:{
        location_ticket_bookings_id_drop_offTolocation:true,
        location_ticket_bookings_id_pick_upTolocation:true,
       
      
      }
    })
  }
  processDelete(data){
    return this.prismaService.ticket_bookings.delete({
      where:{
        id:data
      }
    })
  }
  processUpdate(id,data){
    return this.prismaService.ticket_bookings.update({
      where:{
        id:+id
      },
      data
    })
  }
async  processQuery(data){
    
    let {from,to,date} = data
    from = Number(from)
    to = Number(to)
    const parsedDate = new Date(date);
    
   try {
    const data = await this.prismaService.trips.findMany({
      where:{
        from_local:from,
        to_local:to,
        date:parsedDate
      
        
      },
      include:{
        location_trips_from_localTolocation:{
          select:{
            name:true,
            address:true
          }
        },
        location_trips_to_localTolocation:{
          select:{
            name:true,
            address:true
          }
        },
        bus_operators:{
          select:{
            id:true,
            fullname:true,
            address:true,
            phone:true,
            email:true,
            city_id:true
          }
        }
      }
    })

    console.log(data)
    return data
   } catch (error) {
    console.log(error)
   }
  }

}
