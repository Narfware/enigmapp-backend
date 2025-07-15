import { Server } from './infrastructure/server'

export class EnigmApp {
    server?: Server

    async start() {
        const port = process.env.PORT || '8080'
        this.server = new Server(port)

        this.server.listenHttp()
    }

    async stop() {
        this.server?.stop()
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
