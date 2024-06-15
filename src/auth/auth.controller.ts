import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { cpf: string; password: string }) {
    const { cpf, password } = loginDto;

    console.log('Received login request', loginDto);

    let user = await this.authService.validateStudent(cpf, password);
    if (!user) {
      user = await this.authService.validateTeacher(cpf, password);
    }

    if (!user) {
      console.log('Invalid credentials for', loginDto);
      throw new UnauthorizedException('Invalid credentials');
    }

    console.log('User validated', user);

    return this.authService.login(user);
  }
}
