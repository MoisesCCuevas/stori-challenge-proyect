import { Field, Int, InputType } from '@nestjs/graphql';

@InputType()
export class CreateRecipient {
  @Field(() => Int, { nullable: true })
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => [Number], { nullable: true })
  suscribed?: number[];
}