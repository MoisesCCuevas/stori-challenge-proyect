import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class NewsletterSuscription {
  @Field(() => Int)
  id: number;
}

@InputType()
export class CreateSuscription {
  @Field(() => Int, { nullable: true })
  id: number;

  @Field()
  newsletter: NewsletterSuscription;
}