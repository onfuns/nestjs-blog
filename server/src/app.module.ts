import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import config from '@/config'
import { APP_GUARD } from '@nestjs/core'
import { UserGuard } from '@/guard/auth.guard'
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler'
import { IS_DEV } from '@/util'

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
    ThrottlerModule.forRoot({
      ttl: 10, // 秒
      limit: 20, // 次数
    }),
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
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    !IS_DEV ? { provide: APP_GUARD, useClass: UserGuard } : null,
  ].filter(provider => !!provider),
})
export class AppModule {}
