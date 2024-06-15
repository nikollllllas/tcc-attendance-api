import {
  IsArray,
  IsDateString,
  IsEmail,
  IsInt,
  IsString
} from 'class-validator';

export class CreateStudentDto {
  @IsString()
  cpf: string;

  @IsString()
  academicalRegister: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsDateString()
  birthDate: string;

  @IsArray()
  @IsInt({ each: true })
  subjects: number[];

  @IsArray()
  @IsInt({ each: true })
  courses: number[];
}
