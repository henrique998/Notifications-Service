import { Notification } from "@app/entities/notifcation";
import { INotificationsRepository } from "@app/repositories/INotificationsRepository";

export class InMemoryNotificatinsRepository implements INotificationsRepository {
    public notifications: Notification[] = []

    async create(notification: Notification): Promise<void> {
        this.notifications.push(notification)
    }

    async findById(notificationId: string): Promise<Notification | null> {
        const notification = this.notifications
            .find(notification => notification.id === notificationId)

        if (!notification) {
            return null
        }

        return notification
    }

    async save(notification: Notification): Promise<void> {
        const notificationIndex = this.notifications
            .findIndex(item => item.id === notification.id)

        if (notificationIndex >= 0) {
            this.notifications[notificationIndex] = notification
        }
    }

    async countManyRecipientId(recipientId: string): Promise<number> {
        const notificationsCount = this.notifications
            .filter(notification => notification.recipientId === recipientId)
            .length

        return notificationsCount
    }

    async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
        const notifications = this.notifications
            .filter(notification => notification.recipientId === recipientId)

        return notifications
    }
}