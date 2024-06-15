import { IsInt, IsUUID } from 'class-validator';

export class CreateBeaconDto {
  @IsUUID()
  uuid: string;

  @IsInt()
  subjectId: number;

  @IsInt()
  classroomId: number;

  @IsInt()
  teacherId: number;
}
