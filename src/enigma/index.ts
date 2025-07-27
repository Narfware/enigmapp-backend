import { initAuthenticationContainer } from './contexts/authentication/infrastructure/dependency-injection'
import { DrizzleManager } from './shared/infrastructure/persistence/postgres/drizzle/connection'
import { Server } from './shared/infrastructure/server'

export class EnigmApp {
    server?: Server

    async start() {
        const port = process.env.PORT || '8080'
        this.server = new Server(port)

        if (!process.env.DATABASE_URL) throw Error('Database url not specified')

        const database = DrizzleManager.createClient({ connectionUrl: process.env.DATABASE_URL })
        initAuthenticationContainer(database)

        await this.server.listenHttp()
    }

    async stop() {
        await this.server?.stop()
    }
}

try {
    new EnigmApp().start()
} catch (exception) {
    console.log(exception)
    process.exit(1)
}

process.on('uncaughtException', err => {
    console.log('uncaughtException', err)
    process.exit(1)
})
