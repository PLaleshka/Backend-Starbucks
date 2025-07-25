import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDTO {
  @ApiProperty({
    example: 'success',
    description: 'Estado de la operación de login',
  })
  status!: string;

  @ApiProperty({
    example: 'eyJhbGc...',
    description: 'Token JWT generado al iniciar sesión',
  })
  access_token!: string;
}
