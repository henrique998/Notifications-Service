import { Notification } from "../entities/notifcation";

export abstract class INotificationsRepository {
    abstract create(notifcation: Notification): Promise<void>
    abstract findById(notificationId: string): Promise<Notification | null>
    abstract save(notifcation: Notification): Promise<void>
    abstract countManyRecipientId(recipientId: string): Promise<number>
    abstract findManyByRecipientId(recipientId: string): Promise<Notification[]>
}