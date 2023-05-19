import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Cron } from '@nestjs/schedule';
import { NewsletterService } from './newsletter.service';
import { RecipientService } from './recipient.service';
import { EmailRegister } from '../models/emailRegister.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class EmailService {
  constructor(
    private mailService: MailerService,
    private newsletterService: NewsletterService,
    private recipientService: RecipientService,
    @InjectModel(EmailRegister.name) private emailSended: Model<EmailRegister>
  ) {}

  private async sendMultiple(recipients: any[], newsletter: any) {
    const files = newsletter.files.map((file : any) => {
      return { path: file.data };
    });
    return new Promise((resolve, reject) => {
      Promise.all(
        recipients.map((info: any) => new Promise(async (resolve) => {
          const response = await this.mailService.sendMail({
            to: info.email,
            from: "moisesccuevas.webservices@gmail.com",
            subject: newsletter.name,
            html: newsletter.html + `<br/><a href="http://localhost:4000/unsubscribe/${newsletter.id}/${info.id}" ><p>Unsubscribe</p></a>`,
            attachments: files
          }).catch(() => {
            reject(false)
          });
          resolve(response);
          const emailSended = new this.emailSended({ idNewsletter: newsletter.id, sendDate: new Date().toISOString() })
          emailSended.save();
        }))
      ).then(() => {
        resolve(true);
      })
    });
  }

  async sendEmailByNewsletter(id: string) {
    try {
      const newsletter = await this.newsletterService.findNewsletter(id);
      const recipients = await this.recipientService.findRecipientsByNewsletter(id);
      return await this.sendMultiple(recipients, newsletter);
    } catch (error) {
      return error;
    }    
  }

  @Cron('0 */1 * * * 1-5')
  async scheduleService() {
    const currentTime = new Date().toLocaleString();
    const newsletters = await this.newsletterService.newsletterList();
    newsletters.forEach( async (newsletters: any) => {
      const dateTime = new Date(newsletters.scheduled).toLocaleString();
      if (dateTime === currentTime) {
        await this.sendEmailByNewsletter(newsletters.id)
      }
    });
    console.log("Running service...");
  }

  async emailsSendedList() {
    return this.emailSended.find().exec();
  }

  async countEmails() {
    return this.emailSended.find().count().exec();
  }
}
