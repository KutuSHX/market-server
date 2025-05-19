import { Global, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { DatabaseService } from './database.service'

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('HOST', 'localhost'),
        port: config.get<number>('PORT', 5432),
        username: config.get<string>('USERNAME', 'username'),
        database: config.get<string>('DATABASE', 'database'),
        password: config.get<string>('PASSWORD', 'password'),
        entities: [],
        synchronize: config.get<boolean>('SYNC', true) //Only for development mode. Use 'false' for production.
      })
    })
  ],
  providers: [
    {
      provide: DataSource,
      useFactory: (dataSource: DataSource) => dataSource,
      inject: [DataSource]
    },
    DatabaseService
  ],
  exports: [DatabaseService, TypeOrmModule]
})
export class DatabaseModule {}
