import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(
    createCategoryDto: CreateCategoryDto,
    id: number,
  ): Promise<Category> {
    const isExistCategory = await this.prisma.category.findFirst({
      where: {
        name: createCategoryDto.title,
      },
    });

    if (isExistCategory) {
      throw new BadRequestException('This category already exists');
    }

    const newCategory = await this.prisma.category.create({
      data: {
        name: createCategoryDto.title,
        userId: id,
      },
    });

    return newCategory;
  }

  async findAll(): Promise<Category[]> {
    return await this.prisma.category.findMany();
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.prisma.category.findFirst({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    // const category = await this.prisma.category.findFirst({
    //   where: { id },
    // });

    // if (!category) {
    //   throw new NotFoundException('Category not found');
    // }

    const category = await this.findOne(id);

    return await this.prisma.category.update({
      data: {
        name: updateCategoryDto.title,
      },
      where: { id },
    });
  }

  async remove(id: number) {
    const category = await this.findOne(id);

    return await this.prisma.category.delete({
      where: { id },
    });
  }
}
