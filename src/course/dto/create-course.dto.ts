import { IsString, IsInt, IsArray } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsArray()
  @IsInt({ each: true })
  subjects: number[];

  @IsArray()
  @IsInt({ each: true })
  students: number[];
}
