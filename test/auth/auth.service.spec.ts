import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../src/auth/auth.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;

  const mockUser = {
    id: '123',
    name: 'Admin',
    email: 'admin@email.com',
    role: 'ADMIN',
    password: bcrypt.hash('Senha@123', 10),
  };

  const prisma = {
    user: {
      findUnique: jest.fn().mockResolvedValue(mockUser),
    },
  };

  const jwtService = {
    sign: jest.fn().mockReturnValue('fake-jwt-token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: prisma },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('deve autenticar e retornar token', async () => {
    const dto = { email: mockUser.email, password: 'Senha@123' };
    (jest.spyOn(bcrypt, 'compare') as jest.Mock).mockResolvedValue(true);

    const result = await service.login(dto);
    expect(result.accessToken).toBeDefined();
    expect(result.user.email).toBe(mockUser.email);
  });
});
