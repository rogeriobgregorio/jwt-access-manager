import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // disponibiliza PrismaService em toda a aplicação sem precisar importar
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
