import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createStudentDto: CreateStudentDto) {
    const subjects = await this.prisma.subject.findMany({
      where: { id: { in: createStudentDto.subjects } }
    });

    if (subjects.length !== createStudentDto.subjects.length) {
      throw new NotFoundException('Some subjects were not found');
    }

    const courses = await this.prisma.course.findMany({
      where: { id: { in: createStudentDto.courses } }
    });

    if (courses.length !== createStudentDto.courses.length) {
      throw new NotFoundException('Some courses were not found');
    }

    return this.prisma.student.create({
      data: {
        ...createStudentDto,
        subjects: {
          connect: createStudentDto.subjects.map((id) => ({ id }))
        },
        courses: {
          connect: createStudentDto.courses.map((id) => ({ id }))
        }
      }
    });
  }

  findAll() {
    return this.prisma.student.findMany();
  }

  findOne(id: number) {
    return this.prisma.student.findUnique({ where: { id } });
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const subjects = await this.prisma.subject.findMany({
      where: { id: { in: updateStudentDto.subjects } }
    });

    if (subjects.length !== updateStudentDto.subjects.length) {
      throw new NotFoundException('Some subjects were not found');
    }

    const courses = await this.prisma.course.findMany({
      where: { id: { in: updateStudentDto.courses } }
    });

    if (courses.length !== updateStudentDto.courses.length) {
      throw new NotFoundException('Some courses were not found');
    }

    return this.prisma.student.update({
      where: { id },
      data: {
        ...updateStudentDto,
        subjects: {
          set: updateStudentDto.subjects.map((id) => ({ id }))
        },
        courses: {
          set: updateStudentDto.courses.map((id) => ({ id }))
        }
      }
    });
  }

  remove(id: number) {
    return this.prisma.student.delete({ where: { id } });
  }
}
