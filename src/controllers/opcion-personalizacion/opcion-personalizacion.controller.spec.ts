import { Test, TestingModule } from '@nestjs/testing';
import { OpcionPersonalizacionController } from './opcion-personalizacion.controller';
import { OpcionPersonalizacionService } from 'src/providers/opcion-personalizacion/opcion.personalizacion.service'; // ajusta ruta si cambia

describe('OpcionPersonalizacionController', () => {
  let controller: OpcionPersonalizacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpcionPersonalizacionController],
      providers: [
        {
          provide: OpcionPersonalizacionService,
          useValue: {}, // mock vacío del servicio
        },
      ],
    }).compile();

    controller = module.get<OpcionPersonalizacionController>(OpcionPersonalizacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

