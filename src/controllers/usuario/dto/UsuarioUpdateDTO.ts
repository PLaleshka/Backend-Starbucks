import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UsuarioUpdateDTO {
    @IsOptional()
    @IsString()
    nombre!: string;

    @IsOptional()
    @IsString()
    apellido!: string;

    @IsOptional()
    @IsString()
    numeroCelular!: string;

    @IsOptional()
    @IsEmail()
    correoElectronico!: string;

    @IsOptional()
    @IsString()
    @MinLength(6)
    contraseña!: string;
}
