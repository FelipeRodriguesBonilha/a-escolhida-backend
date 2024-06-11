import { Body, Controller, Post } from '@nestjs/common';
import { SendEmailDto } from './dtos/sendEmail.dto';
import { SendEmailService } from './send-email.service';

@Controller('send-email')
export class SendEmailController {
    constructor(
        private sendEmailService: SendEmailService
    ){}
    
    @Post()
    sendEmail(@Body() sendEmailDto: SendEmailDto): Promise<any>{
        return this.sendEmailService.sendEmail(sendEmailDto);
    }
}
