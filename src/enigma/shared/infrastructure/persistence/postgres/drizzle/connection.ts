import { Pool } from 'pg'
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres'

export class DrizzleManager {
    private static pool?: Pool
    private static database?: NodePgDatabase

    public static createClient({ connectionUrl }: { connectionUrl: string }): NodePgDatabase {
        if (DrizzleManager.database) return DrizzleManager.database

        const pool = new Pool({
            connectionString: connectionUrl,
            max: 20,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000
        })

        const database = drizzle(pool)

        DrizzleManager.pool = pool
        DrizzleManager.database = database

        return database
    }

    public static getPool(): Pool {
        if (!DrizzleManager.pool) throw new Error('DrizzleManager not initialized')

        return DrizzleManager.pool
    }

    public static getDatabase(): NodePgDatabase {
        if (!DrizzleManager.database) throw new Error('DrizzleManager not initialized')

        return DrizzleManager.database
    }

    public static async close(): Promise<void> {
        if (DrizzleManager.pool) {
            await DrizzleManager.pool.end()
        }

        DrizzleManager.reset()
    }

    public static reset(): void {
        DrizzleManager.pool = undefined
        DrizzleManager.database = undefined
    }
}
