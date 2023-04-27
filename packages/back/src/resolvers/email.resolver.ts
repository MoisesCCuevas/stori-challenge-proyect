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
    return this.emailService.emailsSendedList();
  }

  @Mutation(() => Boolean)
  async submission(@Args('id') id: string) {
    return this.emailService.sendEmailByNewsletter(id);
  }
}