import { IsNotEmpty, IsEmail } from 'class-validator';

export class UserDto { 
    @IsNotEmpty() 
    id!: number;

    @IsNotEmpty() @IsEmail() 
    email!: string;

    @IsNotEmpty() 
    name!: string;
}


