import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ClienteDTO {
    @IsNotEmpty()
    @IsString()
    nombre!: string;

    @IsNotEmpty()
    @IsString()
    apellido!: string;

    @IsNotEmpty()
    @IsString()
    numeroCelular!: string;

    @IsNotEmpty()
    @IsEmail()
    correoElectronico!: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    contraseña!: string;
}
