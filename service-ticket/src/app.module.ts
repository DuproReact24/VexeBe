import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [PrismaModule,ClientsModule.register([
    {
      name: "service_history",
      transport: Transport.RMQ,
      options: {
        urls: ["amqp://admin:1234@localhost:5672"],
        queue: "history_queue",
        queueOptions: {
          durable: false // giữ lại queue khi RabbitMQ bị restart
        }
      }
    },
    {
      name: "service_notify",
      transport: Transport.RMQ,
      options: {
        urls: ["amqp://admin:1234@localhost:5672"],
        queue: "notify_queue",
        queueOptions: {
          durable: false // giữ lại queue khi RabbitMQ bị restart
        }
      }
    }
  ])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
