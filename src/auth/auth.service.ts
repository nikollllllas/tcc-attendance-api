import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async validateStudent(cpf: string, password: string): Promise<any> {
    console.log(`Validating student with CPF: ${cpf}`);
    const student = await this.prisma.student.findUnique({ where: { cpf } });
    console.log('Student found:', student);
    if (student && student.password === password) {
      return student;
    }
    return null;
  }

  async validateTeacher(cpf: string, password: string): Promise<any> {
    console.log(`Validating teacher with CPF: ${cpf}`);
    const teacher = await this.prisma.teacher.findUnique({ where: { cpf } });
    console.log('Teacher found:', teacher);
    if (teacher && bcrypt.compareSync(password, teacher.password)) {
      return teacher;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.cpf, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
