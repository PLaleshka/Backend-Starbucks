import { Usuario } from 'src/controllers/database/entities/usuario.entity';

export class LoginResponseDTO {
  token!: string;
  usuario!: Partial<Usuario>;
}