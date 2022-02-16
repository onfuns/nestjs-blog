import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
@Entity({ engine: 'InnoDB' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ comment: '名称' })
  name: string

  @Column({ comment: '路由', unique: true })
  ename: string

  @Column({ default: 0, comment: '父级ID' })
  pid: number

  @Column({ default: 1, comment: '分类类型' })
  type: number

  @Column({ default: 1, comment: '显示状态' })
  status: number

  @Column({ default: 0, comment: '排序' })
  sort: number

  @Column({ nullable: true, comment: '外链地址' })
  url: string

  @Column({ nullable: true, comment: '图标' })
  icon: string

  @Column({ nullable: true, comment: '图标颜色' })
  icon_color: string

  @CreateDateColumn()
  created_at: string

  @UpdateDateColumn()
  updated_at: string
}
