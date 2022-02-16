import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
@Entity({ engine: 'InnoDB' })
export class Tag {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ comment: '名称' })
  name: string

  @Column({ nullable: true, comment: '描述' })
  description: string

  @CreateDateColumn()
  created_at: string

  @UpdateDateColumn()
  updated_at: string
}
