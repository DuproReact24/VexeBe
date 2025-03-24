import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import * as nodemailer from 'nodemailer';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('save_notify')
  sendEmail(@Payload() res) {
    const {data,payinf}= res
   console.log(data)
    let configMail = nodemailer.createTransport({
      service:"gmail",
      auth:{
        user:"phuocdufavn@gmail.com",
        pass:"htgehetndpkaikdk"
      }
    })
    let inforEmail = {
      from :"phuocdufavn@gmail.com",
      to:`${data.email}`,
      subject:"Đặt hàng qua vexe",

      html : `
      <div style="width: 400px; margin: auto; padding: 20px; border: 1px solid #ccc; border-radius: 10px; background-color: #fff; font-family: Arial, sans-serif;">
        <div style="border-bottom: 2px solid #007bff; padding-bottom: 5px; margin-bottom: 10px;">
          <h2>Thông tin dịch vụ</h2>
        </div>
        <p><strong>Hãng xe: ${payinf.companyName}</strong> </p>
        <p><strong>Điểm đón:</strong> ${payinf.from.name}</p>
        <p><strong>Điểm đón:</strong> ${payinf.from.address}</p>
        <p></p>
        <p><strong>Giờ đón (dự kiến):</strong> ${data.booking_time.slice(2,10)} </p>
        <p><strong>Điểm trả:</strong> ${payinf.to.name}</p>
         <p><strong>Điểm đón:</strong> ${payinf.from.address}</p>
        <p></p>
        <p><strong>Số ghế/giường:</strong> VIP: ${JSON.parse(data.seat)} </p>
        <p><strong>Giá vé:</strong> ${Math.round(payinf.total/data.seat.length).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</p>
        <p><strong>Loại xe:</strong> Limousine 20 phòng</p>
      
        <p>(xuất phát lúc ${data.booking_time.slice(11,16)} ngày ${data.booking_time.slice(2,10)})</p>
        <h3 style="color: red; font-weight: bold; font-size: 18px;">Tổng tiền:${payinf.total.toLocaleString("vi-VN", { style: "currency", currency: "VND" })} </h3>
    
        <div style="border-bottom: 2px solid #007bff; padding-bottom: 5px; margin-bottom: 10px;">
          <h2>Thông tin hành khách</h2>
        </div>
  
         <p><strong>Tên: ${payinf.fullname}</strong> </p>
        <p><strong>Điện thoại: ${data.phone}</strong> </p>
        <p><strong>Email:${data.email}</strong> </p>
        <p><strong>Hình thức thanh toán: ${data.phone ? "Đã thanh toán":"Chưa thanh toán"}</strong> </p>
      </div>
    `
    
    }
    configMail.sendMail(inforEmail,(error) => { 

     })
  }
}
