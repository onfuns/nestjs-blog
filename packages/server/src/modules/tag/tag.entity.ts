import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
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
