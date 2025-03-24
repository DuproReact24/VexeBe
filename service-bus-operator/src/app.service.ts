import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prismaService: PrismaService) {}

  async processCreateBusop(data) {
    try {
      const data1 = await this.prismaService.bus.create({
        data,
      });
      return {
        status: 201,
        data,
      };
    } catch (error: any) {
      return {
        status: 400,
        error,
      };
    }
  }
  async processUpdateBusop(db) {
    const { data, id } = db;

    try {
      const index = await this.prismaService.trips.update({
        where: { id: +id },
        data,
      });
      return 'update thanh cong';
    } catch (error: any) {
      console.log(1, error);
      return {
        status: 400,
        error,
      };
    }
  }
  async processDeletedBusop(data) {
    console.log(data)
    try {
      const result = await this.prismaService.trips.delete({
        where: {
          id: data,
        },
      });

      return 'thanh cong';
    } catch (error: any) {
      return {
        status: 400,
        error,
      };
    }
  }
  async processGetBus() {
    try {
      const data = await this.prismaService.bus.findMany();
      console.log(data)
    } catch (error) {
      return {
        status: 400,
        error,
      };
    }
  }

// --- rent
async processCreateRent(data) {
  try {
    const data1 = await this.prismaService.rents_driver.create({
      data,
    });
    return {
      status: 201,
      data,
    };
  } catch (error: any) {
    return {
      status: 400,
      error,
    };
  }
}
async processUpdateRent(db) {
  const { data, id } = db;

  try {
    const index = await this.prismaService.rents_driver.update({
      where: { id: +id },
      data,
    });
    return 'update thanh cong';
  } catch (error: any) {
    console.log(1, error);
    return {
      status: 400,
      error,
    };
  }
}
async processDeletedRent(data) {
  try {
    const result = await this.prismaService.rents_driver.delete({
      where: {
        id: data,
      },
    });

    return 'thanh cong';
  } catch (error: any) {
    return {
      status: 400,
      error,
    };
  }
}
async processGetRent() {
  try {
    return await this.prismaService.rents_driver.findMany();
  } catch (error) {
    return {
      status: 400,
      error,
    };
  }
}
/// trip
async processCreateTrip(data){
  console.log(data)

  try {
    // return await this.prismaService.trips.create({
    //   data: {
    //     departure_time: new Date(data.departure_time),
    //     arrival_time: new Date(data.departure_time),
    //     bus_operators: {
    //       connect: { id: data.bus_opertator_id } // Liên kết với bus_operator có id = 1
    //     }
    //   }
    // });
  } catch (error) {
    console.log(error)
    return {
      status: 400,
      error,
    };
  }


}

async processDeleteTrip(data){
  await this.prismaService.trip_routes.deleteMany({
    where: { trip_id: data },
  });
   await this.prismaService.trips.delete({
    where:{
      id:data
    }
  })
  return "thanh cong"
}

/// local
async processCreateLocal(data){
  return await this.prismaService.location.create({
    data:data
  })
}

async processBus(){
  
  try {
    const tripRoutes = await this.prismaService.trips.findMany({
     
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
          city_id:true,
          img:true
        }
      }
    }
    });
  
    return tripRoutes

  } catch (error) {

    return "i dont no"
  }

    

}



async processBusDetail(id){
 
  try {
    const tripRoutes = await this.prismaService.trips.findMany({
      where:{
        bus_operator_id:id
      },
    include:{
      bus:{
        select:{
          license_plate:true
        }
      }
      ,
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
     
     
    }
    });
    return tripRoutes

  } catch (error) {
    console.log(error)
    return "i dont no"
  }
}


async processUpdateTrip(updateTripDto) {
  console.log("📥 Dữ liệu nhận được:", updateTripDto);

  const { id, departure_time, arrival_time, ...rest } = updateTripDto.data;

  // Chuẩn hóa định dạng thời gian
  const normalizeTime = (time: string) => {
    if (!time) return null;
    // Loại bỏ dấu hai chấm thừa trong phần giây nếu có
    const normalizedTime = time.replace(/:(\d{2}):(\d{2})/, ':$1.$2');
    return new Date(normalizedTime);
  };

  const validDepartureTime = normalizeTime(departure_time);
  const validArrivalTime = normalizeTime(arrival_time);

  if (validDepartureTime && isNaN(validDepartureTime.getTime())) {
    throw new Error("Giá trị departure_time không hợp lệ.");
  }

  if (validArrivalTime && isNaN(validArrivalTime.getTime())) {
    throw new Error("Giá trị arrival_time không hợp lệ.");
  }

  try {
    // Cập nhật chuyến đi vào database
    const updatedTrip = await this.prismaService.trips.update({
      where: { id },
      data: {
        ...rest, // Các trường khác
        departure_time: validDepartureTime ? validDepartureTime.toISOString() : undefined,
        arrival_time: validArrivalTime ? validArrivalTime.toISOString() : undefined,
      },
    });

    console.log("✅ Cập nhật thành công:", updatedTrip);
    return updatedTrip;
  } catch (error) {
    console.error("❌ Lỗi khi cập nhật chuyến đi:", error);
    throw new Error("Không thể cập nhật chuyến đi. Vui lòng thử lại.");
  }
}


}

