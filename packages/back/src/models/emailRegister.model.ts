import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EmailRegister {
  @Field()
  id: number;

  @Field()
  sendDate: string;
}