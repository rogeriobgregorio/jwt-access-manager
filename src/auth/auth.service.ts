import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      this.logger.warn(`Invalid credentials for email: ${email}`);
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userData } = user;
    return userData;
  }

  async login(dto: LoginDto): Promise<AuthResponseDto> {
    try {
      const user = await this.validateUser(dto.email, dto.password);
      const payload = { sub: user.id, role: user.role };
      const token = this.jwtService.sign(payload);

      this.logger.log(`User ${user.email} logged in successfully.`);

      return {
        accessToken: token,
        user,
      };
    } catch (error) {
      this.logger.error(`Login failed for email: ${dto.email}`);
      throw error;
    }
  }
}
