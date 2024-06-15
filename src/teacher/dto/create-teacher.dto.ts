import { IsString, IsArray, IsInt } from 'class-validator';

export class CreateTeacherDto {
  @IsString()
  cpf: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsArray()
  @IsInt({ each: true })
  subjects: number[];
}
