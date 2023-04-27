import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document } from 'mongoose';
import { File } from '../models/file.model';

@Schema()
@ObjectType()
export class Newsletter extends Document {
  @Field()
  id: string;

  @Prop({ required: true })
  @Field()
  name: string;

  @Prop()
  @Field()
  design: string;

  @Prop()
  @Field()
  html: string;

  @Prop()
  @Field({ nullable: true })
  scheduled: string

  @Prop()
  @Field(() => [File], { nullable: true })
  files?: File[];
}

export const NewsletterSchema = SchemaFactory.createForClass(Newsletter);