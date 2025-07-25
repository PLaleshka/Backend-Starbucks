import { Test, TestingModule } from '@nestjs/testing';
import { ProductoController } from './producto.controller';
import { ProductoService } from 'src/providers/producto/producto.service';
import { ProductoDTO } from './dto/producto.dto';
import { ProductoUpdateDTO } from './dto/ProductoUpdateDTO';
import { Producto } from 'src/controllers/database/entities/producto.entity';
import { UpdateResult, DeleteResult } from 'typeorm';

const mockProductoService = {
  getAllProductos: jest.fn(),
  getProducto: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('ProductoController', () => {
  let controller: ProductoController;
  let service: ProductoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductoController],
      providers: [
        {
          provide: ProductoService,
          useValue: mockProductoService,
        },
      ],
    }).compile();

    controller = module.get<ProductoController>(ProductoController);
    service = module.get<ProductoService>(ProductoService);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('debería obtener todos los productos', async () => {
    const productos: Producto[] = [{ idProducto: 1, nombre: 'Café', precio: 10, descripcion: 'Desc', categoria: 'Bebida' } as Producto];
    jest.spyOn(service, 'getAllProductos').mockResolvedValue(productos);
    expect(await controller.getProductos()).toEqual(productos);
  });

  it('debería obtener un producto por ID', async () => {
    const producto = { idProducto: 1, nombre: 'Café', precio: 10, descripcion: 'Desc', categoria: 'Bebida' } as Producto;
    jest.spyOn(service, 'getProducto').mockResolvedValue(producto);
    expect(await controller.getProducto(1)).toEqual(producto);
  });

  it('debería crear un producto', async () => {
    const dto: ProductoDTO = {
      nombre: 'Café',
      precio: 10,
      descripcion: 'Delicioso',
      categoria: 'Bebida',
    };
    const creado = { ...dto, idProducto: 1 } as Producto;
    jest.spyOn(service, 'create').mockResolvedValue(creado);

    const response = await controller.postProducto(dto);
    expect(response.statusCode).toBe(201);
    expect(response.data).toEqual(creado);
  });

  it('debería actualizar un producto', async () => {
    const updateDto: ProductoUpdateDTO = {
      nombre: 'Té',
    };
    const result: UpdateResult = { affected: 1, generatedMaps: [], raw: [] };
    jest.spyOn(service, 'update').mockResolvedValue(result);

    expect(await controller.putProducto(1, updateDto)).toEqual(result);
  });

  it('debería eliminar un producto', async () => {
    const result: DeleteResult = { affected: 1, raw: [] };
    jest.spyOn(service, 'delete').mockResolvedValue(result);

    expect(await controller.deleteProducto(1)).toEqual({ message: 'Producto con id 1 eliminado correctamente' });
  });
});
