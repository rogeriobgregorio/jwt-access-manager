import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { AuthRequestDto } from 'src/auth/dto/auth-request.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Cadastro aberto
  @Post('register')
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  // Rotas autenticadas
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req: AuthRequestDto) {
    if (req.user.role !== 'ADMIN') return [{ id: req.user.userId }];
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: AuthRequestDto) {
    if (req.user.role !== 'ADMIN' && req.user.userId !== id)
      return { message: 'Acesso negado' };
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
    @Request() req: AuthRequestDto,
  ) {
    const user = { id: req.user.userId, role: req.user.role };
    return this.usersService.update(id, dto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: AuthRequestDto) {
    const user = { id: req.user.userId, role: req.user.role };
    return this.usersService.remove(id, user);
  }
}
