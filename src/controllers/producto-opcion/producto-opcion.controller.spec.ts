import { Test, TestingModule } from '@nestjs/testing';
import { ProductoOpcionController } from 'src/controllers/producto-opcion/producto-opcion.controller';

describe('ProductoOpcionController', () => {
  let controller: ProductoOpcionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductoOpcionController],
    }).compile();

    controller = module.get<ProductoOpcionController>(ProductoOpcionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
