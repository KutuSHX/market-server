import { OnModuleDestroy, OnModuleInit, Injectable } from '@nestjs/common'
import { DataSource, EntityManager, EntityTarget, ObjectLiteral, Repository } from 'typeorm'

@Injectable()
export class DatabaseService implements OnModuleDestroy, OnModuleInit {
  constructor(private dataSource: DataSource) {}

  async onModuleInit() {
    await this.dataSource.initialize()
  }

  async onModuleDestroy() {
    await this.dataSource.destroy()
  }

  getManager(): EntityManager {
    return this.dataSource.manager
  }

  getRepository<T extends ObjectLiteral>(entity: EntityTarget<T>): Repository<T> {
    return this.dataSource.getRepository(entity)
  }

  async transaction<T>(fn: (manager: EntityManager) => Promise<T>): Promise<T> {
    return this.dataSource.transaction(fn)
  }

  async healthCheck(): Promise<boolean> {
    try {
      await this.dataSource.query('SELECT 1')

      return true
    } catch {
      return false
    }
  }
}
