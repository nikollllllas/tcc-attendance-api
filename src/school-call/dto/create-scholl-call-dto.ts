import { IsInt, IsArray } from "class-validator"

export class CreateSchoolCallDto {
  @IsInt()
  subjectId: number

  @IsArray()
  @IsInt({ each: true })
  students: number[]
}
