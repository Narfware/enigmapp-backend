import { NonceGenerator } from '../../domain/nonceGenerator'
import { UserRepository } from '../../domain/repositories/userRepository'

export class GenerateChallenge {
    constructor(private userRepository: UserRepository, private nonceGenerator: NonceGenerator) {}

    async execute(id: string) {
        this.userRepository.find(id)
        return this.nonceGenerator.generate()
    }
}
