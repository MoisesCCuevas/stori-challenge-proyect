import {
    Resolver,
    Args,
    Query,
    Mutation,
    ResolveField,
    Parent
  } from '@nestjs/graphql';
  import { Recipient } from '../models/recipient.model';
  import { Newsletter } from '../models/newsletter.model';
  import { CreateRecipient } from '../dtos/recipient.dto';
  import { RecipientService } from '../services/recipient.service';
  import { NewsletterService } from '../services/newsletter.service';
  import { ValidateIdPipe } from '../common/validate-id/validate-id.pipe';
  
  @Resolver(() => Recipient)
  export class RecipientResolver {
    constructor(
      private recipientService: RecipientService,
      private newsletterService: NewsletterService
    ) {}
  
    @Query(() => Recipient)
    async recipient(@Args('id', ValidateIdPipe) id: string) {
      return await this.recipientService.findRecipient(id);
    }
  
    @Query(() => [Recipient])
    async recipientList() {
      return await this.recipientService.recipientsList();
    }
  
    @Mutation(() => Recipient)
    async createRecipient(@Args({ name: 'recipient' }) recipient: CreateRecipient){
      return await this.recipientService.createRecipient(recipient);
    }

    @Mutation(() => Boolean)
    async createManyRecipients(@Args({ name: 'recipients', type: () => [CreateRecipient] }) recipients: CreateRecipient[]){
      return await this.recipientService.createManyRecipient(recipients);
    }

    @ResolveField(() => [Newsletter])
    async suscribed(@Parent() recipient: Recipient) {
      const { suscribed } = recipient;
      console.log(typeof suscribed[0]);
      return await this.newsletterService.findNewsletterByIds(suscribed);
    }
  }