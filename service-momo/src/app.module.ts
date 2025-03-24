import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MomoService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [MomoService],
})
export class AppModule {}
