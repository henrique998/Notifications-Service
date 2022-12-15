import { makeNotification } from "@test/factories/NotificationFactory"
import { InMemoryNotificatinsRepository } from "@test/repositories/InMemoryNotificatinsRepository"
import { NotificationNotFound } from "./errors/NotificationNotFound"
import { UnreadNotificationUseCase } from "./UnreadNotificationUseCase"

describe('Unread Notification', () => {
    it('should be able to unread a notification', async () => {
        const inMemoryNotificatinsRepository = new InMemoryNotificatinsRepository()
        const unreadNotificationUseCase = new UnreadNotificationUseCase(inMemoryNotificatinsRepository)

        const notification = makeNotification({
            readyAt: new Date()
        })

        await inMemoryNotificatinsRepository.create(notification)

        await unreadNotificationUseCase.execute({
            notificationId: notification.id
        })

        expect(inMemoryNotificatinsRepository.notifications[0].readyAt).toBeNull()
    })

    it('should not be able to unread a non existing notification', async () => {
        const inMemoryNotificatinsRepository = new InMemoryNotificatinsRepository()
        const unreadNotificationUseCase = new UnreadNotificationUseCase(inMemoryNotificatinsRepository)

        expect(() => {
            return unreadNotificationUseCase.execute({
                notificationId: 'fake-id'
            })
        }).rejects.toThrow(NotificationNotFound)
    })
})