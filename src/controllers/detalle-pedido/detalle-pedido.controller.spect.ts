import { Test, TestingModule } from '@nestjs/testing';
import { DetallePedidoController } from './detalle-pedido.controller';
import { DetallePedidoService } from 'src/providers/detalle-pedido/detalle-pedido.service';
import { IPostDetallePedidoRequest } from './dto/IPostDetallePedidoRequest';
import { IPutDetallePedidoRequest } from './dto/IPutDetallePedidoRequest';
import { UpdateResult } from 'typeorm';

const mockDetalleService = {
  getAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('DetallePedidoController', () => {
  let controller: DetallePedidoController;
  let service: DetallePedidoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetallePedidoController],
      providers: [
        {
          provide: DetallePedidoService,
          useValue: mockDetalleService,
        },
      ],
    }).compile();

    controller = module.get<DetallePedidoController>(DetallePedidoController);
    service = module.get<DetallePedidoService>(DetallePedidoService);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('debería retornar todos los detalles de pedido', async () => {
    const datosPrueba = [{ idPedido: 1, idProducto: 2 }];
    jest.spyOn(service, 'getAll').mockResolvedValue(datosPrueba as any);
    expect(await controller.getAll()).toEqual(datosPrueba);
  });

  it('debería crear un detalle de pedido', async () => {
    const solicitud: IPostDetallePedidoRequest = {
      idPedido: 1,
      idProducto: 2,
      cantidad: 1,
      tamano: 'Grande',
      temperatura: 'Caliente',
      nivelDulzura: 'Medio',
      tipoLeche: 'Almendra',
      extras: 'Canela',
    };

    const creado = { ...solicitud, idPedido: 1, idProducto: 2 };
    jest.spyOn(service, 'create').mockResolvedValue(creado as any);

    const respuesta = await controller.postDetalle(solicitud);
    expect(respuesta.data).toEqual(creado);
    expect(respuesta.statusCode).toBe(200);
  });

  it('debería actualizar un detalle de pedido', async () => {
    const dtoActualizar: IPutDetallePedidoRequest = {
      cantidad: 3,
    };
    const resultado: UpdateResult = { generatedMaps: [], raw: [], affected: 1 };
    jest.spyOn(service, 'update').mockResolvedValue(resultado);

    const respuesta = await controller.updateDetalle('1', '2', dtoActualizar);
    expect(respuesta).toEqual(resultado);
  });

  it('debería eliminar un detalle de pedido', async () => {
    const espia = jest.spyOn(service, 'delete').mockResolvedValue();
    await controller.deleteDetalle('1', '2');
    expect(espia).toHaveBeenCalledWith(1, 2);
  });
});
