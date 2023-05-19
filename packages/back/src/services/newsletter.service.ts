import { Injectable, NotFoundException } from '@nestjs/common';
import { Newsletter } from '../models/newsletter.model';
import { CreateNewsletter } from '../dtos/newsletter.dto';
import { Pagination } from '../dtos/pagination.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class NewsletterService {
  constructor (
    @InjectModel(Newsletter.name) private newsletters: Model<Newsletter>
  ) {}

  async newsletterList(pag?: Pagination) {
    if (pag) {
      return this.newsletters.find().skip(pag.offset).limit(pag.limit).exec();
    }
    return this.newsletters.find().exec();
  }

  async findNewsletterByIds(ids: any[]) {
    return this.newsletters.find().where('_id').in(ids).exec();
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
