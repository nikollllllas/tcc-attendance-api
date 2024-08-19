import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCourseDto: CreateCourseDto) {
    const subjects = await this.prisma.subject.findMany({
      where: { id: { in: createCourseDto.subjects } }
    });
    if (subjects.length !== createCourseDto.subjects.length) {
      throw new NotFoundException('Some subjects were not found');
    }

    const students = await this.prisma.student.findMany({
      where: { id: { in: createCourseDto.students } }
    });
    if (students.length !== createCourseDto.students.length) {
      throw new NotFoundException('Some students were not found');
    }

    return this.prisma.course.create({
      data: {
        name: createCourseDto.name,
        description: createCourseDto.description,
        subjects: {
          connect: createCourseDto.subjects.map((id) => ({ id }))
        },
        students: {
          connect: createCourseDto.students.map((id) => ({ id }))
        }
      }
    });
  }

  findAll() {
    return this.prisma.course.findMany();
  }

  findOne(id: number) {
    return this.prisma.course.findUnique({ where: { id } });
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const subjects = await this.prisma.subject.findMany({
      where: { id: { in: updateCourseDto.subjects } }
    });

    if (subjects.length !== updateCourseDto.subjects.length) {
      throw new NotFoundException('Some subjects were not found');
    }

    const students = await this.prisma.course.findMany({
      where: { id: { in: updateCourseDto.students } }
    });

    if (students.length !== updateCourseDto.students.length) {
      throw new NotFoundException('Some students were not found');
    }

    return this.prisma.course.update({
      where: { id },
      data: {
        ...updateCourseDto,
        subjects: {
          set: updateCourseDto.subjects.map((id) => ({ id }))
        },
        students: {
          set: updateCourseDto.students.map((id) => ({ id }))
        }
      }
    });
  }

  remove(id: number) {
    return this.prisma.course.delete({ where: { id } });
  }
}
