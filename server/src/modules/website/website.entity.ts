import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Website {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ comment: '名称', unique: true })
  name: string

  @Column({ comment: '值', nullable: true })
  value: string

  @CreateDateColumn()
  created_at: string

  @UpdateDateColumn()
  updated_at: string
}
