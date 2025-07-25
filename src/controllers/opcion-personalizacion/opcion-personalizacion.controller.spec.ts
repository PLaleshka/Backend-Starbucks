import { Test, TestingModule } from '@nestjs/testing';
import { OpcionPersonalizacionController } from './opcion-personalizacion.controller';

describe('OpcionPersonalizacionController', () => {
  let controller: OpcionPersonalizacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpcionPersonalizacionController],
    }).compile();

    controller = module.get<OpcionPersonalizacionController>(OpcionPersonalizacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
