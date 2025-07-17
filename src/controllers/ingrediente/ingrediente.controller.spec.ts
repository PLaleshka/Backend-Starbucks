import { Test, TestingModule } from '@nestjs/testing';
import { IngredienteController } from './ingrediente.controller';
import { IngredienteService } from 'src/providers/ingrediente/ingrediente.service';
import { IPostIngredienteRequest } from './dto/IPostIngredienteRequest';
import { IPutIngredienteRequest } from './dto/IputIngredienteRequest';
import { Ingrediente } from 'src/controllers/database/entities/ingrediente.entity';
import { UpdateResult } from 'typeorm';

const mockIngredienteService = {
  getAll: jest.fn(),
  getById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('IngredienteController', () => {
  let controller: IngredienteController;
  let service: IngredienteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IngredienteController],
      providers: [
        {
          provide: IngredienteService,
          useValue: mockIngredienteService,
        },
      ],
    }).compile();

    controller = module.get<IngredienteController>(IngredienteController);
    service = module.get<IngredienteService>(IngredienteService);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('debería retornar todos los ingredientes', async () => {
    const mockData = [{ idIngrediente: 1, nombre: 'Leche', descripcion: 'Entera' }];
    jest.spyOn(service, 'getAll').mockResolvedValue(mockData as Ingrediente[]);
    expect(await controller.getAll()).toEqual(mockData);
  });

  it('debería retornar un ingrediente por ID', async () => {
    const mockItem = { idIngrediente: 1, nombre: 'Azúcar', descripcion: 'Blanca' };
    jest.spyOn(service, 'getById').mockResolvedValue(mockItem as Ingrediente);
    expect(await controller.getById(1)).toEqual(mockItem);
  });

  it('debería crear un nuevo ingrediente', async () => {
    const request: IPostIngredienteRequest = {
      nombre: 'Café',
      descripcion: 'Molido'
    };
    const creado = { idIngrediente: 2, ...request };
    jest.spyOn(service, 'create').mockResolvedValue(creado as Ingrediente);

    const response = await controller.create(request);
    expect(response.data).toEqual(creado);
    expect(response.statusCode).toBe(201);
  });

  it('debería actualizar un ingrediente', async () => {
    const updateDto: IPutIngredienteRequest = { descripcion: 'Sin lactosa' };
    const result: UpdateResult = { generatedMaps: [], raw: [], affected: 1 };
    jest.spyOn(service, 'update').mockResolvedValue(result);

    const response = await controller.update(1, updateDto);
    expect(response).toEqual({ affected: 1, message: 'Ingrediente actualizado correctamente' });
  });

  it('debería eliminar un ingrediente', async () => {
    jest.spyOn(service, 'delete').mockResolvedValue({ affected: 1, raw: [] });
    const response = await controller.delete(1);
    expect(response.message).toBe('Ingrediente eliminado correctamente');
  });
});
