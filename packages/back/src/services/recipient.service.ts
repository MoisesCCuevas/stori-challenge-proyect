import { Injectable, NotFoundException } from '@nestjs/common';
import { Recipient } from '../models/recipient.model';
import { CreateRecipient } from '../dtos/recipient.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RecipientService {
  constructor (
    @InjectModel(Recipient.name) private recipients: Model<Recipient>
  ) {}

  async recipientsList() {
    return this.recipients.find().exec();
  }

  async findRecipient(id: string) {
    const recipient = await this.recipients.findById(id).exec();
    if (!recipient) throw new NotFoundException(`Recipient id:${id} not found`);
    return recipient;
  }

  async findSuscriptions(id: string) {
    const recipient = await this.recipients.findById(id).exec();
    if (!recipient) throw new NotFoundException(`Recipient id:${id} not found`);
    return recipient.suscribed;
  }

  async createRecipient(payload: CreateRecipient) {
    const { id } = payload;
    let recipient = await this.recipients
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();
    if (!recipient) {
      recipient = new this.recipients(payload);
      recipient.save();
    }
    return recipient;
  }

  async createManyRecipient(payload: CreateRecipient[]) {
    try {
      payload.forEach( async (recipient: any) => {
        await this.createRecipient(recipient);
      });
      return true;
    } catch(error) {
      return false;
    }
  }

  async findRecipientsByNewsletter(id: string) {
    const recipientsList = await this.recipientsList();
    return recipientsList.filter((r: any) => r.suscribed.includes(id));
  }

  async unsubscribeRecipient(idNewsletter: string, idUser: string) {
    try {
      const recipient = await this.findRecipient(idUser);
      const newSuscribed = recipient.suscribed.filter(v => v.id !== idNewsletter);
      await this.recipients
        .findByIdAndUpdate(idUser, { $set: { suscribed: newSuscribed }})
        .exec();
      return "You has been unsubscribed to this newsletter."
    } catch(error) {
      throw new NotFoundException(error.message);
    }
  }
}
