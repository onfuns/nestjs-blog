import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { WebsiteController } from './website.controller'
import { Website } from './website.entity'
import { WebsiteService } from './website.service'

@Module({
  imports: [TypeOrmModule.forFeature([Website])],
  controllers: [WebsiteController],
  providers: [WebsiteService],
  exports: [WebsiteService],
})
export class WebsiteModule {}
