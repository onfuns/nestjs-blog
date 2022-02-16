import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoryController } from './category.controller'
import { CategoryService } from './category.service'
import { Category } from './category.entity'
@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryeModule {}
