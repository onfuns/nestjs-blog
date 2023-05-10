import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class FileType {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ comment: '名称', unique: true })
  name: string

  @CreateDateColumn()
  created_at: string

  @UpdateDateColumn()
  updated_at: string
}

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => FileType, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'file_type_id' })
  filetype: FileType

  @Column({ comment: '分组ID', nullable: true })
  file_type_id: number

  @Column({ comment: '名称', nullable: true })
  originalname: string

  @Column({ comment: '地址' })
  url: string

  @Column({ comment: '大小' })
  size: number

  @Column({ comment: 'ext' })
  ext: string

  @CreateDateColumn()
  created_at: string

  @UpdateDateColumn()
  updated_at: string
}
