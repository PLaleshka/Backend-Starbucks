import { Test, TestingModule } from '@nestjs/testing';
import { InventarioController } from './inventario.controller';
import { InventarioService } from 'src/providers/inventario/inventario.service';
import { IPostInventarioRequest } from './dto/IPostInventarioRequest';
import { IPutInventarioRequest } from './dto/IPutInventarioRequest';
import { Inventario } from 'src/controllers/database/entities/inventario.entity';
import { UpdateResult } from 'typeorm';

const mockService = {
  getAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('InventarioController', () => {
  let controller: InventarioController;
  let service: InventarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventarioController],
      providers: [
        {
          provide: InventarioService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<InventarioController>(InventarioController);
    service = module.get<InventarioService>(InventarioService);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('debería retornar todos los registros de inventario', async () => {
    const data: Inventario[] = [{ cantidad: 5 } as Inventario];
    jest.spyOn(service, 'getAll').mockResolvedValue(data);
    expect(await controller.getAll()).toEqual(data);
  });

  it('debería crear un nuevo registro en el inventario', async () => {
    const request: IPostInventarioRequest = {
      idTienda: 1,
      idIngrediente: 2,
      cantidad: 10,
    };
    const mockResponse = { ...request };
    jest.spyOn(service, 'create').mockResolvedValue(mockResponse as any);

    const response = await controller.create(request);
    expect(response.data).toEqual(mockResponse);
    expect(response.statusCode).toBe(201);
  });

  it('debería actualizar un inventario existente', async () => {
    const updateDto: IPutInventarioRequest = { cantidad: 20 };
    const result: UpdateResult = { affected: 1, generatedMaps: [], raw: [] };
    jest.spyOn(service, 'update').mockResolvedValue(result);

    const response = await controller.update(1, updateDto);
    expect(response).toEqual(result);
  });

  it('debería eliminar un registro de inventario', async () => {
    const spy = jest.spyOn(service, 'delete').mockResolvedValue();
    const response = await controller.delete(1);
    expect(response.message).toBe('Inventario con id 1 eliminado correctamente');
    expect(spy).toHaveBeenCalledWith(1);
  });
});
