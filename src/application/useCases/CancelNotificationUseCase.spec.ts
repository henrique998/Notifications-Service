import { makeNotification } from "@test/factories/NotificationFactory"
import { InMemoryNotificatinsRepository } from "@test/repositories/InMemoryNotificatinsRepository"
import { CancelNotificationUseCase } from "./CancelNotificationUseCase"
import { NotificationNotFound } from "./errors/NotificationNotFound"

describe('cancel Notification', () => {
    it('should be able to cancel a notification', async () => {
        const inMemoryNotificatinsRepository = new InMemoryNotificatinsRepository()
        const cancelNotificationUseCase = new CancelNotificationUseCase(inMemoryNotificatinsRepository)

        const notification = makeNotification()

        await inMemoryNotificatinsRepository.create(notification)

        await cancelNotificationUseCase.execute({
            notificationId: notification.id
        })

        expect(inMemoryNotificatinsRepository.notifications[0].canceledAt).toEqual(
            expect.any(Date)
        )
    })

    it('should not be able to cancel a non existing notification', async () => {
        const inMemoryNotificatinsRepository = new InMemoryNotificatinsRepository()
        const cancelNotificationUseCase = new CancelNotificationUseCase(inMemoryNotificatinsRepository)

        expect(() => {
            return cancelNotificationUseCase.execute({
                notificationId: 'fake-id'
            })
        }).rejects.toThrow(NotificationNotFound)
    })
})