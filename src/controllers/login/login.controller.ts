import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LoginService } from 'src/providers/login/login.service';
import { LoginRequestDTO } from './dto/login-request.dto';
import { RegisterRequestDTO } from './dto/register-request.dto';
import { RegisterWithRoleDTO } from './dto/register-with-role.dto';
import { LoginResponseDTO } from './dto/login-response.dto';
import { RegisterResponseDTO } from './dto/register-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('register')
  async register(@Body() body: RegisterRequestDTO): Promise<RegisterResponseDTO> {
    return this.loginService.register(body); // ya debe encriptar en el service
  }

  @Post('register-with-role')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('administrador')
  async registerWithRole(@Body() body: RegisterWithRoleDTO): Promise<RegisterResponseDTO> {
    return this.loginService.registerWithRole(body); // también encripta
  }

  @Post()
  async login(@Body() body: LoginRequestDTO): Promise<LoginResponseDTO> {
    return this.loginService.validate(body); // debe hacer el bcrypt.compare y devolver el token
  }
}
