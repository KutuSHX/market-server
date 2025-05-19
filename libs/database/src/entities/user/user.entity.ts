import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { UserSecret } from './user-secret.entity'
import { UserHistory } from './user-history.entity'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  email: string

  @OneToMany(() => UserHistory, (history) => history.user, { cascade: true })
  userHistory: UserHistory

  @OneToOne(() => UserSecret, (secret) => secret.user)
  userSecret: UserSecret

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date
}
