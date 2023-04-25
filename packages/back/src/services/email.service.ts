import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Cron } from '@nestjs/schedule';
import { NewsletterService } from './newsletter.service';
import { RecipientService } from './recipient.service';
import { EmailRegister } from '../models/emailRegister.model';

@Injectable()
export class EmailService {
  public emailSended: Array<EmailRegister> = [];

  constructor(
    private mailService: MailerService,
    private newsletterService: NewsletterService,
    private recipientService: RecipientService,
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
          this.emailSended.push({ id: newsletter.id, sendDate: new Date().toISOString() })
        }))
      ).then(() => {
        resolve(true);
      })
    });
  }

  async sendEmailByNewsletter(id: number) {
    try {
      const newsletter = this.newsletterService.findNewsletter(id);
      const recipients = this.recipientService.findRecipientsByNewsletter(id);
      return await this.sendMultiple(recipients, newsletter);
    } catch (error) {
      return error;
    }    
  }

  @Cron('0 */1 * * * 1-5')
  scheduleService() {
    const currentTime = new Date().toLocaleString();
    const newsletters = this.newsletterService.newsletterList();
    newsletters.forEach((newsletters: any) => {
      const dateTime = new Date(newsletters.scheduled).toLocaleString();
      if (dateTime === currentTime) {
        this.sendEmailByNewsletter(newsletters.id)
      }
    });
    console.log("Running service...");
  }

  emailsSendedList() {
    return this.emailSended;
  }
}
