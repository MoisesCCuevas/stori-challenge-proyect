import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class File {
  @Field()
  fileName: string;

  @Field()
  data: string;
}