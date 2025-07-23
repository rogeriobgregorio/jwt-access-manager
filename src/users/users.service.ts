import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: { ...dto, password: hashed },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('Usuário não encontrado');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  async update(
    id: string,
    dto: UpdateUserDto,
    requester: { id: string; role: string },
  ) {
    if (requester.role !== 'ADMIN' && requester.id !== id)
      throw new ForbiddenException('Acesso negado');

    const data = { ...dto };
    if (dto.password) data.password = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.update({ where: { id }, data });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  async remove(id: string, requester: { id: string; role: string }) {
    if (requester.role !== 'ADMIN' && requester.id !== id)
      throw new ForbiddenException('Acesso negado');

    await this.prisma.user.delete({ where: { id } });
    return { message: 'Usuário removido com sucesso' };
  }
}
