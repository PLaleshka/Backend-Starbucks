import { Test, TestingModule } from '@nestjs/testing';
import { TiendaController } from './tienda.controller';
import { TiendaService } from 'src/providers/tienda/tienda.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TiendaEntity } from 'src/controllers/database/entities/tienda.entity';
import { Usuario } from 'src/controllers/database/entities/usuario.entity';

describe('TiendaController', () => {
  let controller: TiendaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TiendaController],
      providers: [
        TiendaService,
        {
          provide: getRepositoryToken(TiendaEntity),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Usuario),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<TiendaController>(TiendaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
