import { Injectable, NotFoundException } from '@nestjs/common';
import { Newsletter } from '../models/newsletter.model';
import { CreateNewsletter } from '../dtos/newsletter.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class NewsletterService {
  constructor (
    @InjectModel(Newsletter.name) private newsletters: Model<Newsletter>
  ) {}

  async newsletterList() {
    return this.newsletters.find().exec();
  }

  async findNewsletter(id: string) {
    const newsletter = await this.newsletters.findById(id).exec();
    if (!newsletter) throw new NotFoundException(`Newsletter id:${id} not found`);
    return newsletter;
  }

  async createNewsletter(payload: CreateNewsletter) {
    const { id } = payload;
    let newsletter = await this.newsletters
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();
    if (!newsletter) {
      newsletter = new this.newsletters(payload);
      newsletter.save();
    }
    return newsletter;
  }

  async removeNewsletter(id: string) {
    return this.newsletters.findByIdAndRemove(id);
  }
}
