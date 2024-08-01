import { LoginDto } from './dto/auth.dto';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async validateUser(loginDto: LoginDto) {
    const { id: loginId, password } = loginDto;

    const findUser = await this.prisma.user.findUnique({
      where: { id: loginId }
    });

    if (!findUser) throw new ForbiddenException('User not found');

    const decodedPassword = await compare(password, findUser.password);

    if (!decodedPassword) {
      throw new ForbiddenException('Invalid password');
    }

    const { id, name, email } = findUser;
    const token = this.jwtService.sign({ id, name, email });

    return { token };
  }

  async userExists(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id }
    });

    return user;
  }
}
