import { ApiProperty } from '@nestjs/swagger';

export class RegisterResponseDTO {
  @ApiProperty({
    example: 'success',
    description: 'Estado del registro (por ejemplo: success o error)',
  })
  status!: string;
}
