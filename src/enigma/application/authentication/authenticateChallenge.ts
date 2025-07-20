type Params = {
    id: string
    nonce: string
    signature: string
}

export class AuthenticateChallenge {
    public execute({ id, nonce, signature }: Params): string {}
}
