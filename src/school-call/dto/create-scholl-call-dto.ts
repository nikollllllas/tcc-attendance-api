import { IsInt, IsString } from "class-validator"

export class CreateSchoolCallDto {
  @IsInt()
  subjectId: number

  @IsString()
  proximityUUID: string

  @IsInt()
  studentId: number
}
