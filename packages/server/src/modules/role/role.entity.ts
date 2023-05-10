import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Auth } from '../auth/auth.entity'

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  name: string

  @Column({ nullable: true })
  description: string

  @ManyToMany(() => Auth, { cascade: true })
  @JoinTable({
    name: 'role_auth_relation',
    joinColumns: [{ name: 'role_id' }],
    inverseJoinColumns: [{ name: 'auth_id' }],
  })
  auths: Auth[]

  @Column({ default: 1, comment: '0--停用,1--启用' })
  enable: number

  @CreateDateColumn()
  created_at: string

  @UpdateDateColumn()
  updated_at: string
}
