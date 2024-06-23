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
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@Controller('courses')
@UseGuards(AuthGuard('jwt'))
@ApiTags('Curso')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @ApiSecurity('token')
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Get()
  @ApiSecurity('token')
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  @ApiSecurity('token')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }

  @Patch(':id')
  @ApiSecurity('token')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  @ApiSecurity('token')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
