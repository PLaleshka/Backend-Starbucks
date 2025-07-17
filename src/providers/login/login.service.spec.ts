import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from './login.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from 'src/controllers/database/entities/usuario.entity';
import { LoginRequestDTO } from 'src/controllers/login/dto/login-request.dto';
import * as bcrypt from 'bcrypt';

describe('LoginService', () => {
  let service: LoginService;

  const usuarioFalso = {
    idUsuario: 1,
    correoElectronico: 'prueba@correo.com',
    contraseña: '', // se seteará luego con hash
    rol: 'cliente',
  };

  beforeEach(async () => {
    // Hasheamos la contraseña simulada
    usuarioFalso.contraseña = await bcrypt.hash('123456', 10);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginService,
        {
          provide: getRepositoryToken(Usuario),
          useValue: {
            findOneBy: jest.fn().mockResolvedValue(usuarioFalso),
            save: jest.fn().mockResolvedValue(usuarioFalso),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('jwt-de-prueba'),
          },
        },
      ],
    }).compile();

    service = module.get<LoginService>(LoginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a JWT token on valid login', async () => {
    const loginDTO: LoginRequestDTO = {
      correoElectronico: 'prueba@correo.com',
      contraseña: '123456',
    };

    const response = await service.validate(loginDTO);
    expect(response).toEqual({
      status: 'Usuario autenticado correctamente',
      access_token: 'jwt-de-prueba',
    });
  });
});
