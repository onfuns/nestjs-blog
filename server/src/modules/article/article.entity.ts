import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Category } from '@/modules/category/category.entity'
import { Tag } from '@/modules/tag/tag.entity'

@Entity()
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Category, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category

  @Column({ comment: '分类ID' })
  category_id: number

  @ManyToMany(() => Tag, { cascade: true })
  @JoinTable({
    name: 'article_tag_relation',
    joinColumns: [{ name: 'article_id' }],
    inverseJoinColumns: [{ name: 'tag_id' }],
  })
  tags: Tag[]

  @Column({ comment: '标题' })
  title: string

  @Column({ nullable: true, comment: '描述' })
  description: string

  @Column({ default: 0, comment: '排序', type: 'bigint' })
  sort: string

  @Column({ type: 'text', nullable: true, comment: '内容' })
  content: string

  @Column({ default: 1, comment: '是否审核' })
  pass_flag: number

  @Column({ default: 0, comment: '是否评论' })
  comment_flag: number

  @Column({ comment: '发布时间' })
  publish_time: string

  @Column({ comment: '作者', nullable: true })
  author: string

  @CreateDateColumn()
  created_at: string

  @UpdateDateColumn()
  updated_at: string
}
