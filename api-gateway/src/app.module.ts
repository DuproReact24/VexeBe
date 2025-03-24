import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthMiddleware } from './auth-middleware.service';
import { AuthRoles } from './auth-roles.service';
// import { AuthMiddleware } from './auth-middleware.service';

@Module({
  imports: [ClientsModule.register([
    {
      name:"service-user",
      transport: Transport.RMQ,
      options: {
      
      urls: ['amqp://admin:1234@localhost:5672'],
  
      queue: 'user_queue',
      queueOptions: {
     
        durable: false
      }
      }
      
    },
    {
      name:"service-momo",
      transport: Transport.RMQ,
      options: {
      
      urls: ['amqp://admin:1234@localhost:5672'],
  
      queue: 'momo_queue',
      queueOptions: {
     
        durable: false
      }
      }
      
    },
   
    {
      name:"service-auth",
      transport: Transport.RMQ,
      options: {
      
      urls: ['amqp://admin:1234@localhost:5672'],
  
      queue: 'auth_queue',
      queueOptions: {
     
        durable: false
      }
      }
      
    },
    {
      name:"service-bus-operator",
      transport: Transport.RMQ,
      options: {
      
      urls: ['amqp://admin:1234@localhost:5672'],
  
      queue: 'bus_queue',
      queueOptions: {
     
        durable: false
      }
      }
      
    },
    {
      name:"service-ticket",
      transport: Transport.RMQ,
      options: {
      
      urls: ['amqp://admin:1234@localhost:5672'],
  
      queue: 'ticket_queue',
      queueOptions: {
     
        durable: false
      }
      }
      
    },
    {
      name:"service-history",
      transport: Transport.RMQ,
      options: {
      
      urls: ['amqp://admin:1234@localhost:5672'],
  
      queue: 'history_queue',
      queueOptions: {
     
        durable: false
      }
      }
      
    }
  ])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(AuthMiddleware).forRoutes('');
    consumer.apply(AuthRoles).forRoutes('get') // Áp dụng middleware cho tất cả route
  }
}
