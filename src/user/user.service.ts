import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as argon from 'argon2';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const hashed_password = await argon.hash(createUserDto.password);

      const existUser = await this.prisma.user.findFirst({
        where: {
          email: createUserDto.email,
        },
      });

      if (existUser) {
        throw new BadRequestException('This email already exist');
      }

      const user = await this.prisma.user.create({
        data: {
          email: createUserDto.email,
          hashed_password,
          name: createUserDto.name,
        },
      });

      const token = this.jwtService.sign({ email: createUserDto.email });

      return { user, token };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credential taken');
        }
      }
      throw error;
    }
  }

  async findOne(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async getOneOrFail(email: string): Promise<User> {
    const user = await this.findOne(email);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
