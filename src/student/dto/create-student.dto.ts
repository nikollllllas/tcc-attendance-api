import {
  IsArray,
  IsDateString,
  IsEmail,
  IsInt,
  IsString,
} from "class-validator"

export class CreateStudentDto {
  @IsString()
  cpf: string

  @IsString()
  academicalRegister: string

  @IsString()
  name: string

  @IsEmail()
  email: string

  @IsDateString()
  birthDate: string

  @IsArray()
  @IsInt({ each: true })
  subjects: number[]

  @IsInt()
  courseId: number
}
