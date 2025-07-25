import { Test, TestingModule } from '@nestjs/testing';
import { ProductoOpcionService } from './producto-opcion.service';

describe('ProductoOpcionService', () => {
  let service: ProductoOpcionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductoOpcionService],
    }).compile();

    service = module.get<ProductoOpcionService>(ProductoOpcionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
