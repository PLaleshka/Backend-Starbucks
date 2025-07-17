import {
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LoginService } from 'src/providers/login/login.service';
import { LoginRequestDTO } from './dto/login-request.dto';
import { RegisterRequestDTO } from './dto/register-request.dto';
import { RegisterWithRoleDTO } from './dto/register-with-role.dto';
import { LoginResponseDTO } from './dto/login-response.dto';
import { RegisterResponseDTO } from './dto/register-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Login')
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar usuario con rol por defecto (cliente)' })
  @ApiBody({ type: RegisterRequestDTO })
  @ApiResponse({
    status: 201,
    description: 'Cliente registrado correctamente',
    type: RegisterResponseDTO,
  })
  async register(
    @Body() body: RegisterRequestDTO,
  ): Promise<RegisterResponseDTO> {
    return this.loginService.register(body);
  }

  @Post('register-with-role')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('administrador')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Registrar usuario con rol explícito (administrador o barista)',
  })
  @ApiBody({ type: RegisterWithRoleDTO })
  @ApiResponse({
    status: 201,
    description: 'Usuario registrado correctamente con rol',
    type: RegisterResponseDTO,
  })
  @ApiResponse({
    status: 403,
    description: 'No autorizado. Requiere rol de administrador.',
  })
  async registerWithRole(
    @Body() body: RegisterWithRoleDTO,
  ): Promise<RegisterResponseDTO> {
    return this.loginService.registerWithRole(body);
  }

  @Post()
  @ApiOperation({ summary: 'Iniciar sesión y obtener JWT' })
  @ApiBody({ type: LoginRequestDTO })
  @ApiResponse({
    status: 200,
    description: 'Inicio de sesión exitoso',
    type: LoginResponseDTO,
  })
  @ApiResponse({
    status: 403,
    description: 'Credenciales inválidas',
  })
  async login(@Body() body: LoginRequestDTO): Promise<LoginResponseDTO> {
    return this.loginService.validate(body);
  }
}
