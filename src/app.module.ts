import { Module } from '@nestjs/common';
import { TasksModule } from './tasks.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/validate';

@Module({
  imports: [
    TasksModule,
    ConfigModule.forRoot({
      validate,
    }),
  ],
})
export class AppModule {}
