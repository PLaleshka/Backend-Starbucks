import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';

import { Usuario } from 'src/controllers/database/entities/usuario.entity';
import { RegisterRequestDTO } from 'src/controllers/login/dto/register-request.dto';
import { RegisterWithRoleDTO } from 'src/controllers/login/dto/register-with-role.dto';
import { LoginRequestDTO } from 'src/controllers/login/dto/login-request.dto';
import { RegisterResponseDTO } from 'src/controllers/login/dto/register-response.dto';
import { LoginResponseDTO } from 'src/controllers/login/dto/login-response.dto'; // <-- IMPORTANTE

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly jwtService: JwtService,
  ) {}

  // Registro con rol por defecto (cliente)
  public async register(
    request: RegisterRequestDTO,
  ): Promise<RegisterResponseDTO> {
    if (!request.contraseña) {
      throw new HttpException('La contraseña es obligatoria', 400);
    }
    const password: string = request.contraseña;
    const encryptedPassword = await hash(password, 10);

    const usuario = new Usuario();
    Object.assign(usuario, request);
    usuario.contraseña = encryptedPassword;
    usuario.rol = 'cliente';

    await this.usuarioRepository.save(usuario);

    return { status: 'Cliente registrado correctamente' };
  }

  // Registro con rol explícito (barista o administrador)
  public async registerWithRole(
    request: RegisterWithRoleDTO,
  ): Promise<RegisterResponseDTO> {
    if (!request.contraseña) {
      throw new HttpException('La contraseña es obligatoria', 400);
    }
    const password: string = request.contraseña;
    const encryptedPassword = await hash(password, 10);

    const usuario = new Usuario();
    Object.assign(usuario, request);
    usuario.contraseña = encryptedPassword;

    await this.usuarioRepository.save(usuario);

    return { status: `Usuario registrado como ${usuario.rol}` };
  }

  // Validación de credenciales y generación de JWT
  public async validate(
  credentials: LoginRequestDTO,
): Promise<LoginResponseDTO> {
  const { correoElectronico, contraseña } = credentials;

  if (!contraseña) {
    throw new HttpException('La contraseña es obligatoria', 400);
  }
  const password: string = contraseña;

  const usuario = await this.usuarioRepository.findOneBy({ correoElectronico });
  if (!usuario) {
    throw new HttpException('Usuario no encontrado', 404);
  }

  const passwordValid = await compare(password, usuario.contraseña);
  if (!passwordValid) {
    throw new HttpException('Contraseña incorrecta', 403);
  }

  const payload = {
    sub: usuario.idUsuario,
    email: usuario.correoElectronico,
    rol: usuario.rol,
  };

  const token = this.jwtService.sign(payload);

  // Elimina la contraseña antes de devolver el usuario
  const { contraseña: _, ...usuarioSinContraseña } = usuario;

  return {
  status: 'Login exitoso',
  access_token: token,
  usuario: usuarioSinContraseña,
};
 }
}