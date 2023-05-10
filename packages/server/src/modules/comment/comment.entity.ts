import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Article } from '../article/article.entity'

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ comment: '昵称' })
  name: string

  @Column({ type: 'text', comment: '留言内容' })
  content: string

  @Column({ type: 'text', comment: '回复内容', nullable: true })
  reply: string

  @Column({ comment: '网址', nullable: true })
  url: string

  @Column({ comment: '文章ID' })
  aid: string

  @ManyToOne(() => Article, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'aid' })
  article: Article

  @Column({ comment: '0:未审核 1:通过', default: 0 })
  status: number

  @CreateDateColumn()
  created_at: string

  @UpdateDateColumn()
  updated_at: string
}
