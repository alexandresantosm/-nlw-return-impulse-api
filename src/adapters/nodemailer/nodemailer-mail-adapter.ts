import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "831308474bbd02",
    pass: "acb8f19c1ee6df"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({subject, body}: SendMailData) {
    await transport.sendMail({
        from: 'Equipe Feedget <oi@feedget.com.br>',
        to: 'Alexandre Menezes <menezesalexandre@meuemail.com>',
        subject,
        html: body,
      });
  };
}