import { Injectable } from "@nestjs/common"
import { Content } from "../entities/content"
import { Notification } from "../entities/notifcation"
import { INotificationsRepository } from "../repositories/INotificationsRepository"

interface IRequest {
    recipientId: string
    content: string
    category: string
}

interface IResponse {
    notification: Notification
}

@Injectable()
export class SendNotificationUseCase {
    constructor(
        private notifcationsRepository: INotificationsRepository
    ) { }

    async execute({ category, content, recipientId }: IRequest): Promise<IResponse> {
        const notification = new Notification({
            category,
            content: new Content(content),
            recipientId
        })

        await this.notifcationsRepository.create(notification)

        return {
            notification
        }
    }
}