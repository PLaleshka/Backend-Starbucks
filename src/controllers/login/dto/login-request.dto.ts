import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDTO {
  @ApiProperty({ example: 'cliente@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  correoElectronico!: string;

  @ApiProperty({ example: 'Cliente123' })
  @IsNotEmpty()
  @IsString()
  contraseña!: string;
}
