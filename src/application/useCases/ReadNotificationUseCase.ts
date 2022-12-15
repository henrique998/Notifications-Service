import { INotificationsRepository } from "@app/repositories/INotificationsRepository";
import { Injectable } from "@nestjs/common"
import { NotificationNotFound } from "./errors/NotificationNotFound";

interface IRequest {
    notificationId: string
}

@Injectable()
export class ReadNotificationUseCase {
    constructor(
        private notificationsRepository: INotificationsRepository
    ) { }

    async execute({ notificationId }: IRequest): Promise<void> {
        const notification = await this.notificationsRepository.findById(notificationId)

        if (!notification) {
            throw new NotificationNotFound()
        }

        notification.read()

        await this.notificationsRepository.save(notification)
    }
}