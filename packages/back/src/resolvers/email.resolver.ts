import {
  Int,
  Resolver,
  Args,
  Mutation
} from '@nestjs/graphql';
import { EmailService } from '../services/email.service';

@Resolver()
export class EmailResolver {
  constructor(
    private emailService: EmailService
  ) {}

  @Mutation(() => Boolean)
  async submission(@Args('id', { type: () => Int }) id: number) {
    return this.emailService.sendEmailByNewsletter(id);
  }
}