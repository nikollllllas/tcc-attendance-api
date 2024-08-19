import { IsString, IsArray, IsInt } from 'class-validator';

export class CreateTeacherDto {
  @IsString()
  cpf: string;

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsArray()
  @IsInt({ each: true })
  subjects: number[];
}
