import { Module } from '@nestjs/common';
import { BaristaController } from './barista.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Barista } from 'src/controllers/database/entities/barista.entity';
import { BaristaService } from 'src/providers/barista/barista.service';

@Module({
  imports: [TypeOrmModule.forFeature([Barista])],
  controllers: [BaristaController],
  providers: [BaristaService],
})
export class BaristaModule {}
