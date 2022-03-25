import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm'
import { Role } from '../role/role.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  name: string

  @Column({ select: false })
  password: string

  @ManyToMany(type => Role)
  @JoinTable({
    name: 'user_role', // 中间表名
    joinColumns: [{ name: 'user_id' }],
    inverseJoinColumns: [{ name: 'role_id' }],
  })
  roles: Role[]

  @Column({ default: 1 })
  enable: number

  @Column()
  last_login_ip: string

  @CreateDateColumn()
  last_login_at: string

  @CreateDateColumn()
  created_at: string

  @UpdateDateColumn()
  updated_at: string
}
