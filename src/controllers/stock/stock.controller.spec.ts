import { Test, TestingModule } from '@nestjs/testing';
import { StockController } from './stock.controller';
import { StockService } from 'src/providers/stock/stock.service';
import { IPostStockRequest } from './dto/IPostStockRequest';
import { IPutStockRequest } from './dto/IPutStockRequest';
import { UpdateResult } from 'typeorm';
import { Stock } from 'src/controllers/database/entities/stock.entity';

const mockStockService = {
  getAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('StockController', () => {
  let controller: StockController;
  let service: StockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockController],
      providers: [
        {
          provide: StockService,
          useValue: mockStockService,
        },
      ],
    }).compile();

    controller = module.get<StockController>(StockController);
    service = module.get<StockService>(StockService);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('debería retornar todos los registros de stock', async () => {
    const mockData = [{ idStock: 1, cantidad: 10 }] as Stock[];
    jest.spyOn(service, 'getAll').mockResolvedValue(mockData);
    const result = await controller.getAll();
    expect(result).toEqual(mockData);
  });

  it('debería crear un nuevo stock', async () => {
    const request: IPostStockRequest = {
      idTienda: 1,
      idProducto: 2,
      cantidad: 15,
    };
    const creado: Stock = {
      idStock: 1,
      cantidad: request.cantidad,
      tienda: { idTienda: request.idTienda } as any,
      producto: { idProducto: request.idProducto } as any,
    };
    jest.spyOn(service, 'create').mockResolvedValue(creado);

    const response = await controller.create(request);
    expect(response.data).toEqual(creado);
    expect(response.statusCode).toBe(201);
  });

  it('debería actualizar stock', async () => {
    const body: IPutStockRequest = { cantidad: 20 };
    const result: UpdateResult = { generatedMaps: [], raw: [], affected: 1 };
    jest.spyOn(service, 'update').mockResolvedValue(result);

    const response = await controller.update(1, body);
    expect(response).toEqual(result);
  });

  it('debería eliminar stock', async () => {
    const spy = jest.spyOn(service, 'delete').mockResolvedValue();
    const result = await controller.delete(1);
    expect(result.message).toBe('Stock con id 1 eliminado correctamente');
    expect(spy).toHaveBeenCalledWith(1);
  });
});
