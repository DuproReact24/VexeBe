import { Controller, Get, Query } from '@nestjs/common';
import { MomoService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly momoService: MomoService) {}

  @MessagePattern('service_momo')
  async pay(@Payload() data) {
    if (!data) {
      return { message: 'Thiếu tham số amount' };
    }

    // Tạo orderId duy nhất (nếu cần)
    const orderId = `ORDER_${Date.now()}`;

    try {
      const result = await this.momoService.createPayment(orderId, data);
      return { payUrl: result.payUrl }; // Trả về URL thanh toán MoMo
    } catch (error) {
      return { error: error.message };
    }
  }
}
