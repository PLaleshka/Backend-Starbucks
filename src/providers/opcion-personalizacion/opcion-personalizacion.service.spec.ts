import { Test, TestingModule } from '@nestjs/testing';
import { OpcionPersonalizacionService } from './opcion.personalizacion.service';

describe('OpcionPersonalizacionService', () => {
  let service: OpcionPersonalizacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpcionPersonalizacionService],
    }).compile();

    service = module.get<OpcionPersonalizacionService>(OpcionPersonalizacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
