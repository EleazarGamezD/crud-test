import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";
@Schema()
export class User extends Document {
    @ApiProperty({
        description: 'The name of the user',
        nullable: false,
        minLength: 1,
        example: 'John',
    })
    @Prop({ required: true, index: true })
    name: string;

    @ApiProperty({
        description: 'The surname of the user',
        nullable: false,
        minLength: 1,
        example: 'Doe',
    })
    @Prop({ index: true })
    surname: string;

    @ApiProperty({
        description: 'The email of the user',
        nullable: false,
        minLength: 1,
        uniqueItems: true,
        example: 'k0QpG@example.com',
    })
    @Prop({ index: true, unique: true })
    email: string;

    @ApiProperty({
        description: 'The age of the user',
        nullable: false,
        example: 30,
    })
    @Prop({ index: true })
    age: number;

    @ApiProperty({
        description: 'The country of the user',
        nullable: false,
        example: 'Colombia',
    })
    @Prop({ index: true })
    country: string;

    @ApiProperty({
        description: 'The city of the user',
        nullable: false,
        example: 'Bogotá',
    })
    @Prop({ index: true })
    city: string;

    @ApiProperty({
        description: 'The hobbies of the user',
        nullable: false,
        example: 'Music',
    })
    @Prop({ index: true })
    hobbies: string;
}
export const UserSchema = SchemaFactory.createForClass(User)