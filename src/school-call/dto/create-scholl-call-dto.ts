import { IsInt, IsString } from "class-validator"

export class CreateSchoolCallDto {
  @IsInt()
  studentId: number

  @IsString()
  proximityUUID: string
}
