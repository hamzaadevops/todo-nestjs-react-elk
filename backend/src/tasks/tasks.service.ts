import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';       // +++
import { Logger as WinstonLogger } from 'winston';                 // +++
import { Task } from './interfaces/task.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel('Task') private readonly taskModel: Model<Task>,
    @Inject(WINSTON_MODULE_PROVIDER)                // +++
    private readonly logger: WinstonLogger,              // +++
  ) {}

  async create(dto: CreateTaskDto) {
    const task = await this.taskModel.create(dto);
    this.logger.info('task_created', { id: task.id, title: task.title });   // +++
    return task;
  }

  async findAll() {
    this.logger.info('tasks_listed');                                    // +++
    return this.taskModel.find().exec();
  }

  async update(id: string, dto: UpdateTaskDto) {
    const task = await this.taskModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    this.logger.info('task_updated', { id });                            // +++
    return task;
  }

  async remove(id: string) {
    await this.taskModel.findByIdAndDelete(id).exec();
    this.logger.info('task_deleted', { id });                            // +++
    return { deleted: true };
  }
}
