import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = await this.prisma.task.create({
      data: {
        name: createTaskDto.name,
        description: createTaskDto.description,
        dateStart: createTaskDto.dateStart,
        dateEnd: createTaskDto.dateEnd,
        taskId: createTaskDto.category.id,
      },
    });

    if (!newTask) {
      throw new BadRequestException('Somethins went wrong...');
    }

    return newTask;
  }

  async findAll(): Promise<Task[]> {
    return await this.prisma.task.findMany();
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findFirst({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException('Category not found');
    }

    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    return await this.prisma.task.update({
      data: updateTaskDto,
      where: { id },
    });
  }

  async remove(id: number) {
    return await this.prisma.task.delete({
      where: { id },
    });
  }
}
