import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UsuarioDTO {
    @IsNotEmpty()
    @IsString()
    nombre!: string;

    @IsNotEmpty()
    @IsString()
    apellido!: string;

    @IsNotEmpty()
    @IsEmail()
    correoElectronico!: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    contraseña!: string;

    @IsNotEmpty()
    @IsEnum(['cliente', 'barista', 'administrador'])
    rol!: 'cliente' | 'barista' | 'administrador';

    @IsOptional()
    @IsString()
    numeroCelular?: string;

    @IsOptional()
    @IsString()
    telefono?: string;
}
