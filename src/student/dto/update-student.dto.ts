import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create-student.dto';
import { IsArray, IsInt } from 'class-validator';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
  @IsArray()
  @IsInt({ each: true })
  subjects: number[];

  @IsArray()
  @IsInt({ each: true })
  courses: number[];
}
