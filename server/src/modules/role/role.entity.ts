import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
@Entity({ engine: 'InnoDB' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ nullable: true })
  auth_id: string

  @CreateDateColumn()
  created_at: string

  @UpdateDateColumn()
  updated_at: string
}
