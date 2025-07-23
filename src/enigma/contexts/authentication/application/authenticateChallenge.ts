import { JWTProvider } from '../domain/interfaces/JWTProvider'
import { NonceGenerator } from '../domain/interfaces/nonceGenerator'
import { SignatureVerifier } from '../domain/interfaces/signatureVerifier'
import { TimeProvider } from '../domain/interfaces/timeProvider'
import { UserRepository } from '../domain/repositories/userRepository'

type Params = {
    id: string
    nonceValue: string
    signature: string
}

export class AuthenticateChallenge {
    constructor(
        private userRepository: UserRepository,
        private signatureVerifier: SignatureVerifier,
        private jwtProvider: JWTProvider,
        private nonceGenerator: NonceGenerator,
        private timeProvider: TimeProvider
    ) {}

    public async execute({ id, nonceValue, signature }: Params): Promise<string> {
        const user = await this.userRepository.find(id)
        user.verifyNonce(this.signatureVerifier, this.nonceGenerator, this.timeProvider, nonceValue, signature)

        this.userRepository.save(user)

        return this.jwtProvider.signUser(user)
    }
}
