import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { Container } from '../../../../shared/dependency-injection/container'
import { CreateUser } from '../../application/createUser'
import { NodeCryptoNonceGenerator } from '../nodeCryptoNonceGenerator'
import { NodeTimeProvider } from '../nodeTimeProvider'
import { DrizzlePostgresUserRepository } from '../repositories/postgresUserRepository'
import { Auth0JWTProvider } from '../auth0JwtProvider'
import { NodeCryptoSignatureVerifier } from '../nodeCryptoSignatureVerifier'
import { AuthenticateChallenge } from '../../application/authenticateChallenge'

export class AuthenticationContainer {
    constructor(private database: NodePgDatabase) {}

    public registerDependencies(): Container {
        const container = new Container()

        const userRepository = new DrizzlePostgresUserRepository(this.database)
        const nonceGenerator = new NodeCryptoNonceGenerator(new NodeTimeProvider())
        const jwtProvider = new Auth0JWTProvider()
        const signatureVerifier = new NodeCryptoSignatureVerifier()
        const timeProvider = new NodeTimeProvider()

        const createUser = new CreateUser(userRepository, nonceGenerator)
        const authenticateChallenge = new AuthenticateChallenge(
            userRepository,
            signatureVerifier,
            jwtProvider,
            nonceGenerator,
            timeProvider
        )

        container.register(CreateUser, createUser)
        container.register(AuthenticateChallenge, authenticateChallenge)

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
