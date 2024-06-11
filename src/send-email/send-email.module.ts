import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SendEmailService } from './send-email.service';
import { SendEmailController } from './send-email.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [SendEmailService],
  controllers: [SendEmailController]
})
export class SendEmailModule { }