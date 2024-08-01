import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { hash } from 'bcrypt';

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

    const teacher = this.prisma.teacher.create({
      data: {
        ...createTeacherDto,
        subjects: {
          connect: createTeacherDto.subjects.map((id) => ({ id }))
        }
      }
    });

    const hashedPassword = await hash('123456', 8);

    await this.prisma.user.create({
      data: {
        name: createTeacherDto.name,
        email: createTeacherDto.email,
        password: hashedPassword
      }
    });

    return teacher;
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
