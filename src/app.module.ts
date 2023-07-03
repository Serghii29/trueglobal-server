import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CategoriesModule } from './categories/categories.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    CategoriesModule,
    TasksModule,
    AuthModule,
    PrismaModule,
  ],
})
export class AppModule {}
