import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cupon } from 'src/controllers/database/entities/cupon.entity';
import { Producto } from 'src/controllers/database/entities/producto.entity';
import { Usuario } from 'src/controllers/database/entities/usuario.entity';
import { IPostCuponRequest } from 'src/controllers/cupon/dto/IPostCuponRequest';
import { IPutCuponRequest } from 'src/controllers/cupon/dto/IPutCuponRequest';

@Injectable()
export class CuponService {
  constructor(
    @InjectRepository(Cupon)
    private cuponRepository: Repository<Cupon>,
  ) {}

  async findAll(): Promise<Cupon[]> {
    return await this.cuponRepository.find();
  }

  async create(dto: IPostCuponRequest): Promise<Cupon> {
    const cupon = new Cupon();
    cupon.codigo = dto.codigo;
    cupon.descuento = dto.descuento;
    cupon.descripcion = dto.descripcion;
    cupon.personalizado = dto.personalizado ?? false;
    cupon.producto = { idProducto: dto.idProducto } as Producto;
    cupon.usuario = { idUsuario: dto.idUsuario } as Usuario;
    return await this.cuponRepository.save(cupon);
  }

  async update(id: number, dto: IPutCuponRequest): Promise<Cupon> {
    const updateData: Partial<Cupon> = { ...dto };
    if (dto.idProducto) {
      updateData.producto = { idProducto: dto.idProducto } as Producto;
    }
    if (dto.idUsuario) {
      updateData.usuario = { idUsuario: dto.idUsuario } as Usuario;
    }
    await this.cuponRepository.update(id, updateData);
    return await this.cuponRepository.findOneByOrFail({ idCupon: id });
  }

  async delete(id: number): Promise<void> {
    await this.cuponRepository.delete(id);
  }

  async generarCuponPersonalizado(usuario: Usuario, producto: Producto): Promise<Cupon | null> {
  const codigo = `PROMO-${producto.nombre.toUpperCase().replace(/\\s+/g, '')}-${usuario.idUsuario}`;

  const existe = await this.cuponRepository.findOne({
    where: { codigo },
  });

  if (existe) return null;

  const cupon = this.cuponRepository.create({
    codigo,
    descripcion: `Cupón del 50% por preferencia en ${producto.nombre}`,
    descuento: 50,
    personalizado: true,
    producto,
    usuario,
  });

  return await this.cuponRepository.save(cupon);
  }
}