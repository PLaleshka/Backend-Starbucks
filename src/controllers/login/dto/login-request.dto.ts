import {
    IsEmail,
    IsNotEmpty,
    IsString,
} from 'class-validator';

export class LoginRequestDTO {
    @IsNotEmpty()
    @IsEmail()
    @IsEmail()
    correoElectronico!: string;

    @IsNotEmpty()
    @IsString()
    contraseña!: string;
}   