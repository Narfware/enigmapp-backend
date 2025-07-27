import { Request, Response } from 'express'
import { CreateUser } from '../../application/createUser'
import { getAuthenticationContainer } from '../dependency-injection'

type CreateUserRequestParams = {
    id: string
    nickName: string
    publicKey: string
}

export class CreateUserController {
    async execute(request: Request<never, never, CreateUserRequestParams>, response: Response): Promise<void> {
        const { id, nickName, publicKey } = request.body

        const useCase = getAuthenticationContainer().get(CreateUser)
        await useCase.execute({
            id,
            nickName,
            publicKey
        })

        response.status(200).send()
    }
}
