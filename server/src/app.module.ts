import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import config from '@/config'
import { APP_GUARD } from '@nestjs/core'
import { UserGuard } from '@/guard/auth.guard'
import { ArticleModule } from '@/modules/article/article.module'
import { CategoryeModule } from '@/modules/category/category.module'
import { TagModule } from '@/modules/tag/tag.module'
import { UserModule } from '@/modules/user/user.module'
import { RoleModule } from '@/modules/role/role.module'
import { AuthModule } from '@/modules/auth/auth.module'
import { CommentModule } from '@/modules/comment/comment.module'
import { CommonModule } from '@/modules/common/common.module'
@Module({
  imports: [
    TypeOrmModule.forRoot(config.db),
    ArticleModule,
    CategoryeModule,
    TagModule,
    UserModule,
    RoleModule,
    AuthModule,
    CommentModule,
    CommonModule,
  ],
  controllers: [],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: UserGuard,
    // },
  ],
})
export class AppModule {}
