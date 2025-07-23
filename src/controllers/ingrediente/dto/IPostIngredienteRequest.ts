import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IPostIngredienteRequest {
  @ApiProperty({
    example: 'Café en grano',
    description: 'Nombre del ingrediente',
    maxLength: 100,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  nombre!: string;

  @ApiProperty({
    example: 'Ingredientes seleccionados para espresso',
    description: 'Descripción del ingrediente',
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  descripcion!: string;
}
