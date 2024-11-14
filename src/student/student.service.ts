import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { CreateStudentDto } from "./dto/create-student.dto"
import { UpdateStudentDto } from "./dto/update-student.dto"
import { hash } from "bcrypt"

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createStudentDto: CreateStudentDto) {
    const subjects = await this.prisma.subject.findMany({
      where: { id: { in: createStudentDto.subjects } },
    })

    if (subjects.length !== createStudentDto.subjects.length) {
      throw new NotFoundException("Some subjects were not found")
    }

    const course = await this.prisma.course.findUnique({
      where: { id: createStudentDto.courseId },
    })

    if (!course) {
      throw new NotFoundException("Course not found")
    }

    const student = this.prisma.student.create({
      data: {
        ...createStudentDto,
        subjects: {
          connect: createStudentDto.subjects.map((id) => ({ id })),
        },
        courseId: createStudentDto.courseId,
      },
    })

    const hashedPassword = await hash("123456", 8)
    console.log(hashedPassword)

    const createdStudent = await student

    if (createdStudent) {
      await this.prisma.user.create({
        data: {
          name: createStudentDto.name,
          email: createStudentDto.email,
          password: hashedPassword,
        },
      })
    }

    return student
  }

  findAll() {
    return this.prisma.student.findMany()
  }

  findOne(id: number) {
    return this.prisma.student.findUnique({ where: { id } })
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const subjects = await this.prisma.subject.findMany({
      where: { id: { in: updateStudentDto.subjects } },
    })

    if (subjects.length !== updateStudentDto.subjects.length) {
      throw new NotFoundException("Some subjects were not found")
    }

    const courses = await this.prisma.course.findUnique({
      where: { id: updateStudentDto.courses },
    })

    if (courses.id !== updateStudentDto.courses) {
      throw new NotFoundException("Course not found")
    }

    return this.prisma.student.update({
      where: { id },
      data: {
        ...updateStudentDto,
        subjects: {
          set: updateStudentDto.subjects.map((id) => ({ id })),
        },
        courseId: updateStudentDto.courses,
      },
    })
  }

  remove(id: number) {
    return this.prisma.student.delete({ where: { id } })
  }
}
