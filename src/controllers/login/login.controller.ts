import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from 'src/providers/login/login.service';
import { LoginRequestDTO } from './dto/login-request.dto';
import { RegisterRequestDTO } from './dto/register-request.dto';
import { RegisterWithRoleDTO } from './dto/register-with-role.dto';
import { LoginResponseDTO } from './dto/login-response.dto';
import { RegisterResponseDTO } from './dto/register-response.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

    @Post('register')
    async register(@Body() body: RegisterRequestDTO): Promise<RegisterResponseDTO> {
        return this.loginService.register(body);
    }

    @Post('register-with-role')
    async registerWithRole(@Body() body: RegisterWithRoleDTO): Promise<RegisterResponseDTO> {
        return this.loginService.registerWithRole(body);
    }

    @Post()
    async login(@Body() body: LoginRequestDTO): Promise<LoginResponseDTO> {
        return this.loginService.validate(body);
    }
}
