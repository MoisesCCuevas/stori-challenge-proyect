import {
    Resolver,
    Args,
    Query,
    Mutation
  } from '@nestjs/graphql';
  import { Recipient } from '../models/recipient.model';
  import { CreateRecipient } from '../dtos/recipient.dto';
  import { RecipientService } from '../services/recipient.service';
  
  @Resolver(() => Recipient)
  export class RecipientResolver {
    constructor(
      private recipientService: RecipientService
    ) {}
  
    @Query(() => Recipient)
    async recipient(@Args('id') id: string) {
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
  }