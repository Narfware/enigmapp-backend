import { beforeAll, beforeEach, describe, it } from 'vitest'
import { UserMother } from '../../domain/UserMother'
import { DrizzlePostgresUserRepository } from '../../../../../../src/enigma/contexts/authentication/infrastructure/repositories/postgresUserRepository'
import { Client, Pool } from 'pg'
import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql'
import { drizzle } from 'drizzle-orm/node-postgres'
import { readMigrationFiles } from 'drizzle-orm/migrator'

let postgresUserRepository: DrizzlePostgresUserRepository
let postgresContainer: StartedPostgreSqlContainer
let postgresClient: Client
let pool: Pool

beforeAll(async () => {
    postgresContainer = await new PostgreSqlContainer('postgres:13-alpine').start()
    const connectionString = postgresContainer.getConnectionUri()

    pool = new Pool({ connectionString })
    const migrations = readMigrationFiles({ migrationsFolder: './drizzle' })
    for (const migration of migrations) {
        for (const sql of migration.sql) {
            await pool.query(sql)
        }
    }

    postgresClient = new Client({ connectionString })
    await postgresClient.connect()
})

beforeEach(async () => {
    const db = drizzle(pool)
    postgresUserRepository = new DrizzlePostgresUserRepository(db)
})

describe('PostgreSQL user repository', () => {
    it('Should save the user', async () => {
        const user = UserMother.create()

        await postgresUserRepository.save(user)
    })
})
