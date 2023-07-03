import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CategoriesModule } from './categories/categories.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, CategoriesModule, TasksModule, AuthModule],
})
export class AppModule {}
