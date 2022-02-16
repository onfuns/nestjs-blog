import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
@Entity({ engine: 'InnoDB' })
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  password: string

  @Column()
  role_id: string

  @Column({ default: 1 })
  enable: number

  @CreateDateColumn()
  created_at: string

  @UpdateDateColumn()
  updated_at: string
}
