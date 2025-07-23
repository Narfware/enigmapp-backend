import { NonceGenerator } from '../domain/interfaces/nonceGenerator'
import { UserRepository } from '../domain/repositories/userRepository'

export class GenerateChallenge {
    constructor(private userRepository: UserRepository, private nonceGenerator: NonceGenerator) {}

    async execute(id: string) {
        const user = await this.userRepository.find(id)
        const nonce = user.generateNonce(this.nonceGenerator)

        await this.userRepository.save(user)

        return nonce
    }
}
