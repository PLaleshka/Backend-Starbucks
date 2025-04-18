import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class ClienteUpdateDTO {
    @IsOptional()
    @IsString()
    nombre!: string;

    @IsOptional()
    @IsString()
    apellido!: string;

    @IsOptional()
    @IsEmail()
    correoElectronico!: string;

    @IsOptional()
    @IsString()
    @MinLength(6)
    contraseña!: string;
}
