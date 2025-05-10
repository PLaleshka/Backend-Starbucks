import {
    IsEmail,
    IsNotEmpty,
    IsString,
    IsStrongPassword
} from 'class-validator';

export class LoginRequestDTO {
    @IsNotEmpty()
    @IsEmail()
    @IsEmail()
    correoElectronico!: string;

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    contraseña!: string;
}   