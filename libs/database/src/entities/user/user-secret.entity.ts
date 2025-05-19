import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { User } from './user.entity'

@Entity({ name: 'user_secret' })
export class UserSecret {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'password_hash', nullable: false })
  passwordHash: string

  @Column({ name: 'refresh_token_hash', nullable: true })
  refreshTokenHash?: string

  @Column({ name: 'two_factor_enabled', default: false })
  twoFactorEnabled: boolean

  @Column({ name: 'two_factor_secret', nullable: true })
  twoFactorSecret?: string

  @OneToOne(() => User, (user) => user.userSecret, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
