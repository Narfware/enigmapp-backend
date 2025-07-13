type Params = {
    uuid: string;
    nickName: string;
    publicKey: string;
};

export class CreateUser {
    async execute({ uuid, nickName, publicKey }: Params): Promise<void> { }
}