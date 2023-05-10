import config from '@/config'
import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ArticleModule } from '@/modules/article/article.module'
import { AuthModule } from '@/modules/auth/auth.module'
import { CategoryeModule } from '@/modules/category/category.module'
import { CommentModule } from '@/modules/comment/comment.module'
import { CommonModule } from '@/modules/common/common.module'
import { FileModule } from '@/modules/file/file.module'
import { RoleModule } from '@/modules/role/role.module'
import { TagModule } from '@/modules/tag/tag.module'
import { UserModule } from '@/modules/user/user.module'
import { WebsiteModule } from '@/modules/website/website.module'

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
    FileModule,
    WebsiteModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    // { provide: APP_GUARD, useClass: UserGuard },
  ].filter(provider => !!provider),
})
export class AppModule {}
