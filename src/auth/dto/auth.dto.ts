import { IsString, IsDefined, IsNotEmpty, IsNumber } from 'class-validator';

export class LoginDto {
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  password: string;
}
