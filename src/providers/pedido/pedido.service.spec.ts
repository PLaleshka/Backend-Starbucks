import { Test, TestingModule } from '@nestjs/testing';
import { PedidoService } from './pedido.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Pedido } from 'src/controllers/database/entities/pedido.entity';
import { Usuario } from 'src/controllers/database/entities/usuario.entity';
import { TiendaEntity } from 'src/controllers/database/entities/tienda.entity';

describe('PedidoService', () => {
  let service: PedidoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PedidoService,
        {
          provide: getRepositoryToken(Pedido),
          useValue: {}, // puedes añadir mocks aquí si los necesitas
        },
        {
          provide: getRepositoryToken(Usuario),
          useValue: {},
        },
        {
          provide: getRepositoryToken(TiendaEntity),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<PedidoService>(PedidoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
