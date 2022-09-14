import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Upload {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ comment: '分组', nullable: true })
  group: string

  @Column({ comment: '名称', nullable: true })
  originalname: string

  @Column({ comment: '地址' })
  url: string

  @Column({ comment: '大小' })
  size: number

  @CreateDateColumn()
  created_at: string

  @UpdateDateColumn()
  updated_at: string
}
