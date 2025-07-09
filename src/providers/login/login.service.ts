import { Injectable, HttpException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cliente } from "src/controllers/database/entities/cliente.entity";
import { Repository } from "typeorm";
import { hash, compare } from "bcrypt";
import { RegisterRequestDTO } from "src/controllers/login/dto/register-request.dto";
import { LoginRequestDTO } from "src/controllers/login/dto/login-request.dto";
import { RegisterResponseDTO } from "src/controllers/login/dto/register-response.dto";
import { LoginResponseDTO } from "src/controllers/login/dto/login-response.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    private readonly jwtService: JwtService // <-- NUEVO
  ) {}

  public async register(request: RegisterRequestDTO): Promise<RegisterResponseDTO> {
    const { contraseña } = request;
    const encryptedPassword = await hash(contraseña, 10);

    request = { ...request, contraseña: encryptedPassword };

    const cliente: Cliente = new Cliente();
    Object.assign(cliente, request);
    const result: Cliente = this.clienteRepository.create(cliente);

    await this.clienteRepository.save(result);

    const response: RegisterResponseDTO = {
      status: "Cliente registrado"
    };

    return response;
  }

  public async validate(credentials: LoginRequestDTO): Promise<LoginResponseDTO> {
    try {
      const { correoElectronico, contraseña } = credentials;
      const result = await this.clienteRepository.findOneBy({ correoElectronico });

      if (!result) {
        throw new HttpException("Cliente no encontrado", 404);
      }

      const checkPassword: boolean = await compare(contraseña, result.contraseña);

      if (!checkPassword) {
        throw new HttpException("Contraseña incorrecta", 403); // ← corregido
      }

      // Generar el JWT:
      const payload = {
        sub: result.idCliente,
        email: result.correoElectronico,
      };

      const token = this.jwtService.sign(payload);

      const response: LoginResponseDTO = {
        status: "Cliente autenticado",
        access_token: token
      };

      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
