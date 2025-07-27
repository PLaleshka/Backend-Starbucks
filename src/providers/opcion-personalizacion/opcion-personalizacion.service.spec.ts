import { Test, TestingModule } from '@nestjs/testing';
import { OpcionPersonalizacionService } from './opcion.personalizacion.service';
import { OpcionPersonalizacion } from 'src/controllers/database/entities/opcion-personalizacion.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('OpcionPersonalizacionService', () => {
  let service: OpcionPersonalizacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OpcionPersonalizacionService,
        {
          provide: getRepositoryToken(OpcionPersonalizacion),
          useValue: {}, // mock del repositorio
        },
      ],
    }).compile();

    service = module.get<OpcionPersonalizacionService>(OpcionPersonalizacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
