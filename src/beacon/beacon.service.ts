import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBeaconDto } from './dto/create-beacon.dto';
import { UpdateBeaconDto } from './dto/update-beacon.dto';

@Injectable()
export class BeaconService {
  constructor(private readonly prisma: PrismaService) {}

  create(createBeaconDto: CreateBeaconDto) {
    return this.prisma.beacon.create({ data: createBeaconDto });
  }

  findAll() {
    return this.prisma.beacon.findMany();
  }

  findOne(id: number) {
    return this.prisma.beacon.findUnique({ where: { id } });
  }
}
