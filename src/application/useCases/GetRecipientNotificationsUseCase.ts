import { Notification } from "@app/entities/notifcation";
import { INotificationsRepository } from "@app/repositories/INotificationsRepository";
import { Injectable } from "@nestjs/common"

interface IRequest {
    recipientId: string
}

type IResponse = {
    notifications: Notification[]
}

@Injectable()
export class GetRecipientNotificationsUseCase {
    constructor(
        private notificationsRepository: INotificationsRepository
    ) { }

    async execute({ recipientId }: IRequest): Promise<IResponse> {
        const notifications = await this.notificationsRepository.findManyByRecipientId(recipientId)

        return {
            notifications
        }
    }
}