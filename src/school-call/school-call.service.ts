import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { CreateSchoolCallDto } from "./dto/create-scholl-call-dto"

@Injectable()
export class SchoolCallService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.schoolCall.findMany({
      include: { subject: true, students: true },
    })
  }

  async findOne(id: number) {
    const schoolCall = await this.prisma.schoolCall.findUnique({
      where: { id },
      include: { subject: true, students: true },
    })
    if (!schoolCall) throw new NotFoundException("School call not found")
    return schoolCall
  }

  async create(createSchoolCallDto: CreateSchoolCallDto) {
    const { subjectId, proximityUUID, studentId } = createSchoolCallDto

    const subject = await this.prisma.subject.findUnique({
      where: { id: subjectId },
    })

    if (!subject) throw new NotFoundException("Subject not found")

    const student = await this.prisma.student.findUnique({
      where: { id: studentId },
    })

    if (!student) throw new NotFoundException("Student not found")

    const schoolCall = await this.prisma.schoolCall.create({
      data: {
        proximityUUID,
        subject: { connect: { id: subjectId } },
        students: { connect: [{ id: studentId }] },
      },
      include: {
        subject: true,
        students: true,
      },
    })

    return { message: 'Attendance recorded successfully', schoolCall }
  }

  async remove(id: number) {
    const schoolCall = await this.prisma.schoolCall.findUnique({
      where: { id },
    })
    if (!schoolCall) throw new NotFoundException("School call not found")
    return this.prisma.schoolCall.delete({ where: { id } })
  }
}
