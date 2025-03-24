import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule, JwtModule.register({
    global: true,
    secret: "keke_idont34",
    signOptions: { expiresIn: '5m' },
  }),ConfigModule.forRoot({
    isGlobal:true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
