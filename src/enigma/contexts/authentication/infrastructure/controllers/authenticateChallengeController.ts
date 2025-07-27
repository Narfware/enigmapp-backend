import { Request, Response } from 'express'
import { getAuthenticationContainer } from '../dependency-injection'
import { AuthenticateChallenge } from '../../application/authenticateChallenge'

type AuthenticateChallengeRequestParams = {
    nonce: string
    signature: string
}

export class AuthenticateChallengeController {
    async execute(
        request: Request<{ userId: string }, never, AuthenticateChallengeRequestParams>,
        response: Response
    ): Promise<void> {
        const { userId } = request.params
        const { nonce, signature } = request.body

        const useCase = getAuthenticationContainer().get(AuthenticateChallenge)
        const token = await useCase.execute({
            id: userId,
            nonceValue: nonce,
            signature
        })
        response.status(200).send({ token })
    }
}
