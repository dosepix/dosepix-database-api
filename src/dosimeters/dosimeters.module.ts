import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DosimetersService } from './dosimeters.service';
import { DosimetersController } from './dosimeters.controller';
import { Dosimeter } from './dosimeter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dosimeter])],
  providers: [DosimetersService],
  controllers: [DosimetersController],
  exports: [DosimetersService],
})
export class DosimetersModule {}
