import { Test, TestingModule } from '@nestjs/testing';
import { RecetaController } from './receta.controller';
import { RecetaService } from 'src/providers/receta/receta.service';
import { IPostRecetaRequest } from './dto/IPostRecetaRequest';
import { Receta } from 'src/controllers/database/entities/receta.entity';

const mockRecetaService = {
  getAll: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
};

describe('RecetaController', () => {
  let controller: RecetaController;
  let service: RecetaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecetaController],
      providers: [
        {
          provide: RecetaService,
          useValue: mockRecetaService,
        },
      ],
    }).compile();

    controller = module.get<RecetaController>(RecetaController);
    service = module.get<RecetaService>(RecetaService);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('debería retornar todas las recetas', async () => {
    const mockData: Receta[] = [
      { idProducto: 1, idIngrediente: 2, cantidad: 3 } as Receta,
    ];
    jest.spyOn(service, 'getAll').mockResolvedValue(mockData);

    const result = await controller.getAll();
    expect(result).toEqual(mockData);
  });

  it('debería crear una receta', async () => {
    const request: IPostRecetaRequest = {
      idProducto: 1,
      idIngrediente: 2,
      cantidad: 3,
    };

    const recetaCreada = {
      idProducto: 1,
      idIngrediente: 2,
      cantidad: 3,
    } as Receta;

    jest.spyOn(service, 'create').mockResolvedValue(recetaCreada);

    const response = await controller.postReceta(request);

    expect(response.statusCode).toBe(200);
    expect(response.data).toEqual(recetaCreada);
  });

  it('debería eliminar una receta', async () => {
    const spy = jest.spyOn(service, 'delete').mockResolvedValue();
    await controller.deleteReceta('1', '2');
    expect(spy).toHaveBeenCalledWith(1, 2);
  });
});
