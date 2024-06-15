import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Injectable()
export class TeacherService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTeacherDto: CreateTeacherDto) {
    const subjects = await this.prisma.subject.findMany({
      where: { id: { in: createTeacherDto.subjects } }
    });

    if (subjects.length !== createTeacherDto.subjects.length) {
      throw new NotFoundException('Some subjects were not found');
    }

    return this.prisma.teacher.create({
      data: {
        ...createTeacherDto,
        subjects: {
          connect: createTeacherDto.subjects.map((id) => ({ id }))
        }
      }
    });
  }

  findAll() {
    return this.prisma.teacher.findMany();
  }

  findOne(id: number) {
    return this.prisma.teacher.findUnique({ where: { id } });
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    const subjects = await this.prisma.subject.findMany({
      where: { id: { in: updateTeacherDto.subjects } }
    });

    if (subjects.length !== updateTeacherDto.subjects.length) {
      throw new NotFoundException('Some subjects were not found');
    }

    return this.prisma.teacher.update({
      where: { id },
      data: {
        ...updateTeacherDto,
        subjects: {
          set: updateTeacherDto.subjects.map((id) => ({ id }))
        }
      }
    });
  }

  remove(id: number) {
    return this.prisma.teacher.delete({ where: { id } });
  }
}
