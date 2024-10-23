import { IsInt, IsArray } from "class-validator"

export class CreateSchoolCallDto {
  @IsInt()
  subjectId: number

  @IsInt()
  classroomId: number

  @IsArray()
  @IsInt({ each: true })
  students: number[]
}
