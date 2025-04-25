import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    WinstonModule.forRoot({                     // <-- provides “NestWinston”
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
        }),
      ],
    }),
    MongooseModule.forRoot(
      process.env.MONGO_URL || 'mongodb://mongo:27017/todos',
    ),
    TasksModule,
  ],
})
export class AppModule {}
