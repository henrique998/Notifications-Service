import { INotificationsRepository } from "@app/repositories/INotificationsRepository";
import { Injectable } from "@nestjs/common"
import { NotificationNotFound } from "./errors/NotificationNotFound";

interface IRequest {
    notificationId: string
}

type IResponse = void

@Injectable()
export class CancelNotificationUseCase {
    constructor(
        private notificationsRepository: INotificationsRepository
    ) { }

    async execute({ notificationId }: IRequest): Promise<IResponse> {
        const notification = await this.notificationsRepository.findById(notificationId)

        if (!notification) {
            throw new NotificationNotFound()
        }

        notification.cancel()

        await this.notificationsRepository.save(notification)
    }
}