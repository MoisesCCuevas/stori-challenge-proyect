
import { Field, InputType, Int } from '@nestjs/graphql';
import { CreateFile } from './file.dto';

@InputType()
export class CreateNewsletter {
  @Field({ nullable: true })
  id: string;

  @Field()
  name: string;

  @Field()
  design: string;

  @Field()
  html: string;

  @Field({ nullable: true })
  scheduled: string;

  @Field(() => [CreateFile], { nullable: true })
  files?: CreateFile[];
}  
