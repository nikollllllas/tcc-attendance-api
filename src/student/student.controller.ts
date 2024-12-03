import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@Controller('students')
@UseGuards(AuthGuard('jwt'))
@ApiTags('Estudante')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @ApiSecurity('token')
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  @ApiSecurity('token')
  findAll() {
    return this.studentService.findAll();
  }

  @Get("/users")
  @ApiSecurity('token')
  findAllUsers() {
    return this.studentService.findAllUsers();
  }

  @Get(':id')
  @ApiSecurity('token')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }

  @Patch(':id')
  @ApiSecurity('token')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  @ApiSecurity('token')
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
}
