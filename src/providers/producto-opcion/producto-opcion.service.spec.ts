import { Test, TestingModule } from '@nestjs/testing';
import { ProductoOpcionService } from './producto-opcion.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductoOpcion } from 'src/controllers/database/entities/producto-opcion.entity';

describe('ProductoOpcionService', () => {
  let service: ProductoOpcionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductoOpcionService,
        {
          provide: getRepositoryToken(ProductoOpcion),
          useValue: {}, // mock básico del repositorio
        },
      ],
    }).compile();

    service = module.get<ProductoOpcionService>(ProductoOpcionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
