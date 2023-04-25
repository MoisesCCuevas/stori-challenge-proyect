import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Recipient {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => [Number], { nullable: true })
  suscribed?: number[];
}