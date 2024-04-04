
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {

    @ApiProperty({
        description: 'Name of the user',
        nullable: true,
        minLength: 1,
    })
    @IsString()
    @MinLength(1)
    @IsOptional()
    name?: string;

    @ApiProperty({
        description: 'Surname of the user',
        nullable: true,
        minLength: 1,
    })
    @IsString()
    @MinLength(1)
    @IsOptional()
    surname?: string;

    @ApiProperty({
        description: 'Email of the user',
        nullable: true,
        minLength: 1,
    })
    @IsString()
    @MinLength(1)
    @IsOptional()
    email?: string;

    @ApiProperty({
        description: 'Age of the user',
        nullable: true,
        minLength: 1,
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    age?: number;

    @ApiProperty({
        description: 'Country of the user',
        nullable: true,
        minLength: 1,
    })
    @IsString()
    @MinLength(1)
    @IsOptional()
    country?: string;

    @ApiProperty({
        description: 'City of the user',
        nullable: true,
        minLength: 1,
    })
    @IsString()
    @MinLength(1)
    @IsOptional()
    city?: string;

    @ApiProperty({
        description: 'Hobbies of the user',
        nullable: true,
        minLength: 1,
    })
    @IsString()
    @MinLength(1)
    @IsOptional()
    hobbies?: string;
}
