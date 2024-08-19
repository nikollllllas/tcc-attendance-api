import { IsString, IsInt } from 'class-validator';

export class CreateSubjectDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsInt()
  workload: number;
}
