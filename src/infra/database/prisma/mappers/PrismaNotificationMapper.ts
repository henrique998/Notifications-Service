import { Notification as RawNotification } from "@prisma/client"
import { Notification } from "@app/entities/notifcation";
import { Content } from "@app/entities/content";

export class PrismaNotificationMapper {
    static toPrisma(notification: Notification) {
        return {
            id: notification.id,
            category: notification.category,
            content: notification.content.value,
            recipientId: notification.recipientId,
            readyAt: notification.readyAt,
            createdAt: notification.createdAt
        }
    }

    static toDomain(raw: RawNotification): Notification {
        return new Notification({
            category: raw.category,
            content: new Content(raw.content),
            recipientId: raw.recipientId,
            canceledAt: raw.canceledAt,
            readyAt: raw.readyAt,
            createdAt: raw.createdAt,
        }, raw.id)
    }
}