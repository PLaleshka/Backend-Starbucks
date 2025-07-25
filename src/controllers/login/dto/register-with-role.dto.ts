import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterWithRoleDTO {
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

  @ApiProperty({ example: 'barista@example.com' })
  @IsNotEmpty()
  @IsEmail()
  correoElectronico!: string;

  @ApiProperty({ example: 'Barista123' })
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 6,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  })
  contraseña!: string;

  @ApiProperty({ example: 'barista', enum: ['cliente', 'barista', 'administrador'] })
  @IsNotEmpty()
  @IsIn(['cliente', 'barista', 'administrador'])
  rol!: 'cliente' | 'barista' | 'administrador';
}
