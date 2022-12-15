import { makeNotification } from "@test/factories/NotificationFactory"
import { InMemoryNotificatinsRepository } from "@test/repositories/InMemoryNotificatinsRepository"
import { ReadNotificationUseCase } from "./ReadNotificationUseCase"
import { NotificationNotFound } from "./errors/NotificationNotFound"

describe('Read Notification', () => {
    it('should be able to read a notification', async () => {
        const inMemoryNotificatinsRepository = new InMemoryNotificatinsRepository()
        const readNotificationUseCase = new ReadNotificationUseCase(inMemoryNotificatinsRepository)

        const notification = makeNotification()

        await inMemoryNotificatinsRepository.create(notification)

        await readNotificationUseCase.execute({
            notificationId: notification.id
        })

        expect(inMemoryNotificatinsRepository.notifications[0].readyAt).toEqual(
            expect.any(Date)
        )
    })

    it('should not be able to read a non existing notification', async () => {
        const inMemoryNotificatinsRepository = new InMemoryNotificatinsRepository()
        const readNotificationUseCase = new ReadNotificationUseCase(inMemoryNotificatinsRepository)

        expect(() => {
            return readNotificationUseCase.execute({
                notificationId: 'fake-id'
            })
        }).rejects.toThrow(NotificationNotFound)
    })
})