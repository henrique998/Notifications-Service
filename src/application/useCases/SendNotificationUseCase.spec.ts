import { InMemoryNotificatinsRepository } from "@test/repositories/InMemoryNotificatinsRepository"
import { SendNotificationUseCase } from "./sendNotificationUseCase"

describe('Send Notification', () => {
    it('should be able to send a notification', async () => {
        const inMemoryNotificatinsRepository = new InMemoryNotificatinsRepository()
        const sendNotificationUseCase = new SendNotificationUseCase(inMemoryNotificatinsRepository)

        const { notification } = await sendNotificationUseCase.execute({
            category: 'social',
            content: 'This is a notication',
            recipientId: 'example-id'
        })

        expect(inMemoryNotificatinsRepository.notifications).toHaveLength(1)
        expect(inMemoryNotificatinsRepository.notifications[0]).toEqual(notification)
    })
})