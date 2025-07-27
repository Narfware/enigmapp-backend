import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql'
import { DrizzleManager } from '../../../../../src/enigma/shared/infrastructure/persistence/postgres/drizzle/connection'
import { readMigrationFiles } from 'drizzle-orm/migrator'
import { Pool } from 'pg'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'

export class DrizzlePostgresArranger {
    private container?: StartedPostgreSqlContainer
    private pool?: Pool

    public async initializeDatabase(): Promise<NodePgDatabase> {
        this.container = await new PostgreSqlContainer('postgres:13-alpine').start()
        const connectionString = this.container.getConnectionUri()

        const database = DrizzleManager.createClient({ connectionUrl: connectionString })

        this.pool = DrizzleManager.getPool()

        const migrations = readMigrationFiles({ migrationsFolder: './drizzle' })
        for (const migration of migrations) {
            for (const sql of migration.sql) {
                await this.pool!.query(sql)
            }
        }

        return database
    }

    public async cleanDatabase(): Promise<void> {
        if (!this.pool) throw new Error('Pool not initialized')
        await this.pool.query('TRUNCATE TABLE users RESTART IDENTITY CASCADE')
    }

    public async close(): Promise<void> {
        if (this.pool) {
            await this.pool.end()
        }

        if (this.container) {
            await this.container.stop()
        }

        DrizzleManager.reset()
    }
}
