import { Field, Int, ObjectType } from '@nestjs/graphql';
import { File } from './file.model';

@ObjectType()
export class Newsletter {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  design: string;

  @Field()
  html: string;

  @Field({ nullable: true })
  scheduled: string

  @Field(() => [File], { nullable: true })
  files?: File[];
}