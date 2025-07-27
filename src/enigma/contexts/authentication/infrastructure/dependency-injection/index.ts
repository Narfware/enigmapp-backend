import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { Container } from '../../../../shared/dependency-injection/container'
import { CreateUser } from '../../application/createUser'
import { NodeCryptoNonceGenerator } from '../nodeCryptoNonceGenerator'
import { NodeTimeProvider } from '../nodeTimeProvider'
import { DrizzlePostgresUserRepository } from '../repositories/postgresUserRepository'

export class AuthenticationContainer {
    constructor(private database: NodePgDatabase) {}

    public registerDependencies(): Container {
        const container = new Container()

        const userRepository = new DrizzlePostgresUserRepository(this.database)
        const nonceGenerator = new NodeCryptoNonceGenerator(new NodeTimeProvider())
        const useCase = new CreateUser(userRepository, nonceGenerator)

        container.register(CreateUser, useCase)

        return container
    }
}

let container: Container

export function initAuthenticationContainer(database: NodePgDatabase): void {
    container = new AuthenticationContainer(database).registerDependencies()
}

export function getAuthenticationContainer(): Container {
    if (!container) throw new Error('Container not initialized')
    return container
}
