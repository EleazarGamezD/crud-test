import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPositive, IsString, MinLength } from "class-validator";

export class CreateUserDto {

    @ApiProperty({
        description: 'Name of the user',
        nullable: false,
        minLength: 1,
    })
    @IsString()
    @MinLength(1)
    name: string;

    @ApiProperty({
        description: 'Surname of the user',
        nullable: false,
        minLength: 1,
    })
    @IsString()
    @MinLength(1)
    surname: string;

    @ApiProperty({
        description: 'Email of the user',
        nullable: false,
        minLength: 1,
    })
    @IsString()
    @MinLength(1)
    email: string;

    @ApiProperty({
        description: 'Age of the user',
        nullable: false,
        minLength: 1,
    })
    @IsNumber()
    @IsPositive()
    age: number;

    @ApiProperty({
        description: 'Country of the user',
        nullable: false,
        minLength: 1,
    })
    @IsString()
    @MinLength(1)
    country: string;

    @ApiProperty({
        description: 'City of the user',
        nullable: false,
        minLength: 1,
    })
    @IsString()
    @MinLength(1)
    city: string;

    @ApiProperty({
        description: 'Hobbies of the user',
        nullable: false,
        minLength: 1,
    })
    @IsString()
    @MinLength(1)
    hobbies: string;


}
