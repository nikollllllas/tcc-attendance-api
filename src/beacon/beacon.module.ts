import { Module } from '@nestjs/common';
import { BeaconService } from './beacon.service';
import { BeaconController } from './beacon.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BeaconController],
  providers: [BeaconService]
})
export class BeaconModule {}
