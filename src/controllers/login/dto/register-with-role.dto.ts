import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsIn
} from 'class-validator';

export class RegisterWithRoleDTO {
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
    @IsStrongPassword({
        minLength: 6,
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 0,
    })
    contraseña!: string;

    @IsNotEmpty()
    @IsIn(['cliente', 'barista', 'administrador'])
    rol!: 'cliente' | 'barista' | 'administrador';
}
