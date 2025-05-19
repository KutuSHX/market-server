import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { User } from './user.entity'

@Entity({ name: 'user_history' })
export class UserHistory {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  ip: string

  @Column()
  browser: string

  @Column()
  os: string

  @Column()
  device: string

  @Column()
  userAgent: string

  @Column({ nullable: true })
  location?: string

  @Column({ default: 'success' })
  status: 'success' | 'fail' | 'blocked'

  @Column({ nullable: true })
  failureReason?: string

  @ManyToOne(() => User, (user) => user.userHistory)
  @JoinColumn()
  user: User

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date
}
