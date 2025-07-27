import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../src/users/users.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { User } from '@prisma/client';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: DeepMockProxy<PrismaService>;

  beforeEach(async () => {
    prisma = mockDeep<PrismaService>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('deve criar um usuário com senha criptografada', async () => {
    const dto = {
      name: 'Test',
      email: 'test@email.com',
      password: 'Senha@123',
    };

    const hashed = await bcrypt.hash(dto.password, 10);
    (jest.spyOn(bcrypt, 'hash') as jest.Mock).mockResolvedValueOnce(hashed);

    const userMock: User = {
      id: '1',
      name: dto.name,
      email: dto.email,
      password: hashed,
      role: 'USER',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    prisma.user.create.mockResolvedValueOnce(userMock);

    const result = await service.create(dto);

    expect(result).toHaveProperty('id');
    expect(result).not.toHaveProperty('password');
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(prisma.user.create).toHaveBeenCalled();
  });
});
