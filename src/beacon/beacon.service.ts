import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Make sure to have PrismaService
import { Beacon } from '@prisma/client';

@Injectable()
export class BeaconService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Beacon[]> {
    return this.prisma.beacon.findMany({ include: { teacher: true } });
  }

  async findById(id: number): Promise<Beacon> {
    return this.prisma.beacon.findUnique({
      where: { id },
      include: { teacher: true }
    });
  }

  async create(data: any): Promise<Beacon> {
    return this.prisma.beacon.create({ data });
  }

  async update(id: number, data: any): Promise<Beacon> {
    return this.prisma.beacon.update({ where: { id }, data });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.beacon.delete({ where: { id } });
  }
}
