import { INotificationsRepository } from "@app/repositories/INotificationsRepository";
import { Injectable } from "@nestjs/common"

interface IRequest {
    recipientId: string
}

type IResponse = {
    count: number
}

@Injectable()
export class CountRecipientNotificationsUseCase {
    constructor(
        private notificationsRepository: INotificationsRepository
    ) { }

    async execute({ recipientId }: IRequest): Promise<IResponse> {
        const count = await this.notificationsRepository.countManyRecipientId(recipientId)

        return {
            count
        }
    }
}