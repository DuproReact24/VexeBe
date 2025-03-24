import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as crypto from 'crypto';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class MomoService {
  private partnerCode = process.env.MOMO_PARTNER_CODE || 'MOMO';
  private accessKey = process.env.MOMO_ACCESS_KEY || 'F8BBA842ECF85';
  private secretKey = process.env.MOMO_SECRET_KEY || 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
  private redirectUrl = process.env.MOMO_REDIRECT_URL || 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
  private ipnUrl = process.env.MOMO_IPN_URL || 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';

  async createPayment(orderId: string, amount: number) {
    const requestId = this.partnerCode + new Date().getTime();
    const orderInfo = 'Thanh toán đơn hàng MoMo';
    const extraData = ''; // Nếu không có dữ liệu bổ sung, để rỗng
    const requestType = 'captureWallet';
    const lang = 'vi';

    // Tạo chuỗi signature theo yêu cầu MoMo
    const rawSignature = `accessKey=${this.accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${this.ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${this.partnerCode}&redirectUrl=${this.redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

    // Mã hóa HMAC SHA256
    const signature = crypto.createHmac('sha256', this.secretKey).update(rawSignature).digest('hex');

    // Body gửi lên MoMo
    const requestBody = {
      partnerCode: this.partnerCode,
      accessKey: this.accessKey,
      requestId: requestId,
      amount: amount.toString(),
      orderId: orderId,
      orderInfo: orderInfo,
      redirectUrl: this.redirectUrl,
      ipnUrl: this.ipnUrl,
      extraData: extraData,
      requestType: requestType,
      signature: signature,
      lang: lang,
    };

    try {
      // Gửi request đến MoMo
      const response = await axios.post('https://test-payment.momo.vn/v2/gateway/api/create', requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.data; // Trả về dữ liệu từ MoMo
    } catch (error) {
      console.error('Lỗi khi gọi API Momo:', error.response?.data || error.message);
      throw new Error('Thanh toán thất bại');
    }
  }
}
