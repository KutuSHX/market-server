import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User, UserHistory, UserSecret } from './entities'

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('HOST', 'localhost'),
        port: config.get<number>('PORT', 5432),
        database: config.get<string>('DATABASE', 'database'),
        username: config.get<string>('USERNAME', 'postgres'),
        password: config.get<string>('PASSWORD', 'password'),
        synchronize: config.get<boolean>('SYNC', true), //Only for development mode. Use "false" for production.
        entities: [User, UserHistory, UserSecret]
      })
    })
  ]
})
export class DatabaseModule {}
