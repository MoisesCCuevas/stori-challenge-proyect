import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
@ObjectType()
export class EmailRegister extends Document {
  @Field()
  id: string;

  @Prop({ required: true })
  @Field()
  idNewsletter: string;

  @Prop()
  @Field()
  sendDate: string;
}

export const EmailRegisterSchema = SchemaFactory.createForClass(EmailRegister);