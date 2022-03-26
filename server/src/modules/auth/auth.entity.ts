import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ unique: true })
  code: string

  @Column({ comment: '1--菜单,2--功能' })
  type: number

  @Column({ default: 0 })
  pid: number

  @CreateDateColumn()
  created_at: string

  @UpdateDateColumn()
  updated_at: string
}
