import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Newsletter } from './newsletter.model';

@ObjectType()
export class Suscriptions {
  @Field(() => Int)
  id: number;

  @Field(() => Newsletter)
  newsletter: Newsletter;
}