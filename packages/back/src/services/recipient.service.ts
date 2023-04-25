import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecipient } from '../dtos/recipient.dto';

@Injectable()
export class RecipientService {
  public recipients: Array<any> = [];

  recipientsList() {
    return this.recipients;
  }

  findRecipient(id: number) {
    const recipient = this.recipients.find((f) => f.id === id);
    if (!recipient) throw new NotFoundException(`Recipient id:${id} not found`);
    return recipient;
  }

  findSuscriptions(id: number) {
    const recipient = this.recipients.find((f) => f.id === id);
    if (!recipient) throw new NotFoundException(`Recipient id:${id} not found`);
    return recipient.suscribed;
  }

  createRecipient(payload: CreateRecipient) {
    if (payload.id) {
      const recipient = this.recipients.filter((f) => f.id !== payload.id);
      recipient.push(payload);
      this.recipients = recipient;
    } else {
      payload.id = this.recipients.length + 1;
      this.recipients.push(payload);
    }
    return payload;
  }

  createManyRecipient(payload: CreateRecipient[]) {
    try {
      payload.forEach((recipient: any) => {
        this.createRecipient(recipient);
      });
      return true;
    } catch(error) {
      return false;
    }
  }

  findRecipientsByNewsletter(id: number) {
    const recipientsList = this.recipients.filter((r: any) => r.suscribed.includes(id));
    return recipientsList;
  }

  unsubscribeRecipient(idNewsletter: number, idUser: number) {
    try {
      const reciepients = [...this.recipients];
      const recipient = reciepients.find((r) => r.id == idUser);
      this.recipients = reciepients.filter((reciepient) => reciepient.id != idUser);
      recipient.suscribed = recipient.suscribed.filter((value: number) => value != idNewsletter);
      this.recipients.push(recipient);
      return "You has been unsubscribed to this newsletter."
    } catch(error) {
      throw new NotFoundException(error.message);
    }
  }
}
