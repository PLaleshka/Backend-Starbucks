import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from './usuario.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Usuario } from 'src/controllers/database/entities/usuario.entity';
import { ClienteService } from './usuario.service';

describe('UsuarioService', () => {
  let service: UsuarioService;
describe('ClienteService', () => {
  let service: ClienteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuarioService,
        {
          provide: getRepositoryToken(Usuario),
          useValue: {}, // Puedes añadir funciones mock aquí
        },
      ],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
    service = module.get<ClienteService>(ClienteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

