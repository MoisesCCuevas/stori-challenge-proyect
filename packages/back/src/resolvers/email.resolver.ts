import {
  Resolver,
  Args,
  Mutation,
  Query
} from '@nestjs/graphql';
import { EmailService } from '../services/email.service';
import { EmailRegister } from '../models/emailRegister.model';

@Resolver()
export class EmailResolver {
  constructor(
    private emailService: EmailService
  ) {}

  @Query(() => [EmailRegister])
  async emailsSendedList() {
    return await this.emailService.emailsSendedList();
  }

  @Query(() => Number)
  async totalEmailsSended() {
    return await this.emailService.countEmails();
  }

  @Mutation(() => Boolean)
  async submission(@Args('id') id: string) {
    return await this.emailService.sendEmailByNewsletter(id);
  }
}