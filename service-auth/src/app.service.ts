import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AppService {
  private JWT_SECRET = 'keke_idont34'; // Thay bằng secret key thực tế (lưu trong .env)

  async validate(data) {
    try {
      // ✅ Giải mã token
      const decoded = jwt.verify(data.token, this.JWT_SECRET) as any;
      
      if (!decoded || !decoded.sub) {
        throw new UnauthorizedException('Invalid token');
      }

      // ✅ Kiểm tra token có hết hạn không
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp && decoded.exp < currentTime) {
        throw new UnauthorizedException('Token expired');
      }

      // ✅ Trả về thông tin user nếu token hợp lệ
      return { valid: true, payload: decoded };
    } catch (error) {
      
      return { valid: false,error};
    }
  }
}
