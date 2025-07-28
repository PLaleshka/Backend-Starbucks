import { Test, TestingModule } from '@nestjs/testing';
import { ProductoController } from './producto.controller';
import { ProductoService } from 'src/providers/producto/producto.service';
import { ProductoDTO } from './dto/producto.dto';
import { ProductoUpdateDTO } from './dto/ProductoUpdateDTO';
import { Producto } from 'src/controllers/database/entities/producto.entity';
import { UpdateResult, DeleteResult } from 'typeorm';

describe('ProductoController', () => {
  let controller: ProductoController;
  let mockProductoService: {
    getAllProductos: jest.Mock;
    getProducto: jest.Mock;
    create: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
    findAllPaginated: jest.Mock;
  };

  beforeEach(async () => {
    mockProductoService = {
      getAllProductos: jest.fn(),
      getProducto: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAllPaginated: jest.fn(),
    };

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
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('debería obtener productos paginados por tienda', async () => {
    const productosPaginados = {
      data: [
        {
          idProducto: 1,
          nombre: 'Café',
          precio: 10,
          descripcion: 'Desc',
          categoria: 'Bebida',
        } as Producto,
      ],
      page: 1,
      limit: 10,
      total: 1,
    };

    mockProductoService.findAllPaginated.mockResolvedValue(productosPaginados);

    const result = await controller.getProductos(1, 1, 10);
    expect(result).toEqual(productosPaginados);
  });

  it('debería obtener un producto por ID', async () => {
    const producto = {
      idProducto: 1,
      nombre: 'Café',
      precio: 10,
      descripcion: 'Desc',
      categoria: 'Bebida',
    } as Producto;

    mockProductoService.getProducto.mockResolvedValue(producto);

    const result = await controller.getProducto(1);
    expect(result).toEqual(producto);
  });

  it('debería obtener todos los productos sin paginación', async () => {
    const productos: Producto[] = [
      {
        idProducto: 1,
        nombre: 'Café',
        precio: 10,
        descripcion: 'Desc',
        categoria: 'Bebida',
      } as Producto,
    ];

    mockProductoService.getAllProductos.mockResolvedValue(productos);

    const result = await controller.getAllProductos();
    expect(result).toEqual(productos);
  });

  it('debería crear un producto', async () => {
    const dto: ProductoDTO = {
      nombre: 'Café',
      precio: 10,
      descripcion: 'Delicioso',
      categoria: 'Bebida',
    };

    const creado = { ...dto, idProducto: 1 } as Producto;

    mockProductoService.create.mockResolvedValue(creado);

    const response = await controller.postProducto(dto);
    expect(response).toEqual(creado);
  });

  it('debería actualizar un producto', async () => {
    const updateDto: ProductoUpdateDTO = {
      nombre: 'Té',
    };

    const result: UpdateResult = { affected: 1, generatedMaps: [], raw: [] };

    mockProductoService.update.mockResolvedValue(result);

    const response = await controller.putProducto(1, updateDto);
    expect(response).toEqual(result);
  });

  it('debería eliminar un producto', async () => {
    const result: DeleteResult = { affected: 1, raw: [] };

    mockProductoService.delete.mockResolvedValue(result);

    const response = await controller.deleteProducto(1);
    expect(response).toEqual({
      message: 'Producto con id 1 eliminado correctamente',
    });
  });
});
