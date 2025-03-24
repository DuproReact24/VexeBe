import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthRoles implements NestMiddleware {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:1234@localhost:5672'],
        queue: 'auth_queue',
        queueOptions: { durable: false },
      },
    });
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
  throw new UnauthorizedException('Invalid or missing token');
}

const token = authHeader.split(' ')[1];


    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      // Gửi token lên Auth Service qua RabbitMQ
      const response = await lastValueFrom(this.client.send('auth-validate', { token }));
      console.log(response)
      if(response.valid){
        if(response.payload.role != 1 ){
          throw new UnauthorizedException('khong phai admin');
        }
        (req as any).user = { userId: response };
        next();
      }
      throw new UnauthorizedException(response.error);

      
    } catch (error) {
      
      throw new UnauthorizedException(error.message);
    }
  }
}
