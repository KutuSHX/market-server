import { EntityTarget, ObjectLiteral, Repository, DataSource } from 'typeorm'
import { Injectable } from '@nestjs/common'

@Injectable()
export abstract class BaseRepository<Entity extends ObjectLiteral> {
  protected repository: Repository<Entity>

  constructor(private readonly entity: EntityTarget<Entity>, dataSource: DataSource) {
    this.repository = dataSource.getRepository(entity)
  }
}
