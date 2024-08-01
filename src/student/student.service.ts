import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { hash } from 'bcrypt';

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

    const student = this.prisma.student.create({
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

    const hashedPassword = await hash('123456', 8);

    await this.prisma.user.create({
      data: {
        name: createStudentDto.name,
        email: createStudentDto.email,
        password: hashedPassword
      }
    });

    return student;
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
