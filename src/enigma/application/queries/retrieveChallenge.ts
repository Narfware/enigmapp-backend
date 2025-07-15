import { NonceGenerator } from '../../domain/nonceGenerator'
import { UserRepository } from '../../domain/repositories/userRepository'

export class RetrieveChallenge {
    constructor(private userRepository: UserRepository, private nonceGenerator: NonceGenerator) {}

    async execute(id: string) {}
}
