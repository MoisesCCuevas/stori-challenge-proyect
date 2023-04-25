import {
    Int,
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
    async recipient(@Args('id', { type: () => Int }) id: number) {
      return this.recipientService.findRecipient(id);
    }
  
    @Query(() => [Recipient])
    async recipientList() {
      return this.recipientService.recipientsList();
    }
  
    @Mutation(() => Recipient)
    async createRecipient(@Args({ name: 'recipient' }) recipient: CreateRecipient){
      return this.recipientService.createRecipient(recipient);
    }

    @Mutation(() => Boolean)
    async createManyRecipients(@Args({ name: 'recipients', type: () => [CreateRecipient] }) recipients: CreateRecipient[]){
      return this.recipientService.createManyRecipient(recipients);
    }
  }