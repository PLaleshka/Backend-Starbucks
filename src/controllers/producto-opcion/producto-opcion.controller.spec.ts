import { Test, TestingModule } from '@nestjs/testing';
import { ProductoOpcionController } from 'src/controllers/producto-opcion/producto-opcion.controller';
import { ProductoOpcionService } from 'src/providers/producto-opcion/producto-opcion.service'; // ajusta si la ruta cambia

describe('ProductoOpcionController', () => {
  let controller: ProductoOpcionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductoOpcionController],
      providers: [
        {
          provide: ProductoOpcionService,
          useValue: {}, // simulamos el servicio con un mock vacío
        },
      ],
    }).compile();

    controller = module.get<ProductoOpcionController>(ProductoOpcionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
