import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
@ObjectType()
export class Recipient extends Document {
  @Field()
  id: string;

  @Prop({ required: true })
  @Field()
  name: string;

  @Prop({ required: true })
  @Field()
  email: string;

  @Prop()
  @Field(() => [String], { nullable: true })
  suscribed?: string[];
}

export const RecipientSchema = SchemaFactory.createForClass(Recipient);