import { Injectable, NotFoundException } from '@nestjs/common';
import { Newsletter } from '../models/newsletter.model';
import { CreateNewsletter } from '../dtos/newsletter.dto';

@Injectable()
export class NewsletterService {
  public newsletters: Array<Newsletter> = [];

  newsletterList() {
    return this.newsletters;
  }

  findNewsletter(id: number) {
    const newsletter = this.newsletters.find((f) => f.id === id);
    if (!newsletter) throw new NotFoundException(`Newsletter id:${id} not found`);
    return newsletter;
  }

  createNewsletter(payload: CreateNewsletter) {
    if (payload.id) {
      const newsletter = this.newsletters.filter((f) => f.id !== payload.id);
      newsletter.push(payload);
      this.newsletters = newsletter;
    } else {
      payload.id = this.newsletters.length + 1;
      this.newsletters.push(payload);
    }
    return payload;
  }
}
