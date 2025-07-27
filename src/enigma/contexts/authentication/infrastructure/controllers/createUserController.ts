import { Request, Response } from 'express'
import { CreateUser } from '../../application/createUser'
import { DrizzlePostgresUserRepository } from '../repositories/postgresUserRepository'
import { DrizzleManager } from '../../../../shared/infrastructure/persistence/postgres/drizzle/connection'
import { NodeCryptoNonceGenerator } from '../nodeCryptoNonceGenerator'
import { NodeTimeProvider } from '../nodeTimeProvider'

type CreateUserParams = {
    id: string
    nickName: string
    publicKey: string
}

export class CreateUserController {
    async execute(request: Request<never, never, CreateUserParams>, response: Response): Promise<void> {
        const { id, nickName, publicKey } = request.body

        const userRepository = new DrizzlePostgresUserRepository(DrizzleManager.getDatabase())
        const nonceGenerator = new NodeCryptoNonceGenerator(new NodeTimeProvider())

        const useCase = new CreateUser(userRepository, nonceGenerator)
        await useCase.execute({
            id,
            nickName,
            publicKey
        })

        response.status(200).send()
    }
}
