import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateFile {
  @Field()
  fileName: string;

  @Field()
  data: string;
}