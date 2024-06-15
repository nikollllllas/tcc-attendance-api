import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';

@Injectable()
export class ClassroomService {
  constructor(private readonly prisma: PrismaService) {}

  create(createClassroomDto: CreateClassroomDto) {
    return this.prisma.classroom.create({ data: createClassroomDto });
  }

  findAll() {
    return this.prisma.classroom.findMany();
  }

  findOne(id: number) {
    return this.prisma.classroom.findUnique({ where: { id } });
  }

  update(id: number, updateClassroomDto: UpdateClassroomDto) {
    return this.prisma.classroom.update({
      where: { id },
      data: updateClassroomDto
    });
  }

  remove(id: number) {
    return this.prisma.classroom.delete({ where: { id } });
  }
}
