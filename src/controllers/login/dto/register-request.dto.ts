import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterRequestDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nombre!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  apellido!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  numeroCelular!: string;

  @ApiProperty({ example: 'cliente@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  correoElectronico!: string;

  @ApiProperty({ example: 'Cliente123' })
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 6,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  })
  contraseña!: string;
}
