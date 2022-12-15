import { Injectable } from "@nestjs/common";
import { Notification } from "@app/entities/notifcation";
import { INotificationsRepository } from "@app/repositories/INotificationsRepository";
import { PrismaService } from "../prisma.service";
import { PrismaNotificationMapper } from "../mappers/PrismaNotificationMapper";

@Injectable()
class PrismaNotificationsRepository implements INotificationsRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findById(notificationId: string): Promise<Notification | null> {
        const notification = await this.prisma.notification.findUnique({
            where: {
                id: notificationId
            }
        })

        if (!notification) {
            return null
        }

        return PrismaNotificationMapper.toDomain(notification)
    }

    async create(notification: Notification): Promise<void> {
        const raw = PrismaNotificationMapper.toPrisma(notification)

        await this.prisma.notification.create({
            data: raw
        })
    }

    async save(notification: Notification): Promise<void> {
        const raw = PrismaNotificationMapper.toPrisma(notification)

        await this.prisma.notification.update({
            where: {
                id: raw.id,
            },
            data: raw
        })
    }

    async countManyRecipientId(recipientId: string): Promise<number> {
        const count = await this.prisma.notification.count({
            where: {
                recipientId
            }
        })

        return count
    }

    async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
        const notifications = await this.prisma.notification.findMany({
            where: {
                recipientId
            }
        })

        return notifications.map(PrismaNotificationMapper.toDomain)
    }
}

export { PrismaNotificationsRepository }