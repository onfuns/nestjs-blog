import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
@Entity({ engine: 'InnoDB' })
export class Auth {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ unique: true })
  code: string

  @Column()
  type: string

  @Column({ default: 0 })
  pid: number

  @CreateDateColumn()
  created_at: string

  @UpdateDateColumn()
  updated_at: string
}
