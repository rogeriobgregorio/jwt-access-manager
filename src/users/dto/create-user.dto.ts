import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @Matches(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{6,}/, {
    message:
      'Senha deve conter letra maiúscula, minúscula, número e caractere especial.',
  })
  password: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role; // Só será usado por admin
}
