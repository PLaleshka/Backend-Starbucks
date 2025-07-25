import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class IngredienteDTO {
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
    description: 'Descripción detallada del ingrediente',
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  descripcion!: string;
}
