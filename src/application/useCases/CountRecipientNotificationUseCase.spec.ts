import { makeNotification } from "@test/factories/NotificationFactory"
import { InMemoryNotificatinsRepository } from "@test/repositories/InMemoryNotificatinsRepository"
import { CountRecipientNotificationsUseCase } from "./CountRecipientNotificationsUseCase"

describe('Count Recipient Notifications', () => {
    it('should be able to count recipient notifications', async () => {
        const inMemoryNotificatinsRepository = new InMemoryNotificatinsRepository()
        const countRecipientNotificationUseCase = new CountRecipientNotificationsUseCase(inMemoryNotificatinsRepository)

        await inMemoryNotificatinsRepository
            .create(makeNotification({ recipientId: 'recipient-1' }))

        await inMemoryNotificatinsRepository
            .create(makeNotification({ recipientId: 'recipient-1' }))

        await inMemoryNotificatinsRepository
            .create(makeNotification({ recipientId: 'recipient-2' }))

        const { count } = await countRecipientNotificationUseCase.execute({
            recipientId: 'recipient-1'
        })

        expect(count).toEqual(2)
    })
})