import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Newsletter } from './newsletter.model';

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

  @Prop({ type: [{ type: Types.ObjectId, ref: Newsletter.name }] })
  @Field(() => [Newsletter], { nullable: true })
  suscribed?: Newsletter[];
}

export const RecipientSchema = SchemaFactory.createForClass(Recipient);