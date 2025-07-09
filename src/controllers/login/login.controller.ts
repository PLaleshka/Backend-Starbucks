import { Body, Controller, Post } from '@nestjs/common';
import { LoginRequestDTO } from './dto/login-request.dto';
import { LoginResponseDTO } from './dto/login-response.dto';
import { LoginService } from 'src/providers/login/login.service';
import { RegisterRequestDTO } from './dto/register-request.dto';


@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @Post()
    public async login(@Body() request: LoginRequestDTO): Promise<LoginResponseDTO> {
        return await this.loginService.validate(request);
    }

    @Post('register')
    public async register(@Body() request: RegisterRequestDTO): Promise<any> {
        return this.loginService.register(request);
    }


}
