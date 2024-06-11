// send-email.service.ts

import { Injectable } from '@nestjs/common';
import { SendEmailDto } from './dtos/sendEmail.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class SendEmailService {
    FROM_EMAIL = process.env.FROM_EMAIL;
    GMAIL_KEY = process.env.GMAIL_KEY;

    async sendEmail(sendEmailDto: SendEmailDto): Promise<any> {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: this.FROM_EMAIL,
                pass: this.GMAIL_KEY,
            },
        });

        try {
            await transporter.sendMail({
                from: process.env.FROM_EMAIL,
                to: sendEmailDto.email,
                subject: "Recuperação de senha!",
                html: `
                    <h1>Olá, ${sendEmailDto.name}!</h1>
                    <p>Este é o email para recuperação de senha.</p>
                    <button 
                        style="height: 40px; border: none; background-color: purple; color: white; border-radius: 2px"
                    >Redefinir Senha</button>
                `,
            })
            return { message: `Email enviado a ${sendEmailDto.email}!` };
        } catch (error) {
            return { message: `Erro ao enviar email! ${error}` };
        }
    }
}
