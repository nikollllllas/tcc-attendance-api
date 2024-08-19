import { IsInt } from 'class-validator';

export class CreateClassroomDto {
  @IsInt()
  labNumber: number;

  @IsInt()
  subjectId: number;
}
