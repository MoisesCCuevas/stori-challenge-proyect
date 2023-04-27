import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateRecipient {
  @Field({ nullable: true })
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => [String], { nullable: true })
  suscribed?: string[];
}