import {
  Int,
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
  emailsSendedList() {
    return this.emailService.emailsSendedList();
  }

  @Mutation(() => Boolean)
  async submission(@Args('id', { type: () => Int }) id: number) {
    return this.emailService.sendEmailByNewsletter(id);
  }
}