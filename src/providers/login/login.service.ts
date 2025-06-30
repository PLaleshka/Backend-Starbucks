import { Injectable, HttpException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cliente } from "src/controllers/database/entities/cliente.entity";
import { Repository } from "typeorm";
import { hash, compare} from "bcry";
import { RegisterRequestDTO } from "src/controllers/login/dto/register-request.dto";
import { LoginRequestDTO } from "src/controllers/login/dto/login-request.dto";
import { RegisterResponseDTO } from "src/controllers/login/dto/register-response.dto";
import { LoginResponseDTO } from "src/controllers/login/dto/login-response.dto";

@Injectable()
export class LoginService {
    constructor(
        @InjectRepository(Cliente)
        private readonly clienteRepository: Repository<Cliente>,
    ) {}

    public async register(request: RegisterRequestDTO): Promise<RegisterResponseDTO> {
        const { contraseña } = request;
        const encryptedPassword = await hash(contraseña, 10);

        request = { ...request, contraseña: encryptedPassword };

        const cliente: Cliente = new Cliente();
        Object.assign(cliente, request);
        const result: Cliente = this.clienteRepository.create(cliente);

        await this.clienteRepository.save(result);

        const response: RegisterResponseDTO = { status: "Cliente registrado" } as RegisterResponseDTO;

        return response;
    }

    public async validate(credentials: LoginRequestDTO): Promise<LoginResponseDTO> {
        try {
            const { correoElectronico } = credentials;
            const result = await this.clienteRepository.findOneBy({ correoElectronico });

            if (!result) {
                throw new HttpException("Cliente no encontrado", 404);
            }

            const { contraseña } = credentials;
            const checkPassword: boolean = await compare(contraseña, result.contraseña);

            if (!checkPassword) 
                new HttpException("Contraseña incorrecta", 403);

            const response: LoginResponseDTO = { 
                status: "Cliente autenticado",
            } as LoginResponseDTO;
            return response;
        } catch (error: any) {
            throw new Error(error);
        }
    }
}