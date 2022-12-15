import { makeNotification } from "@test/factories/NotificationFactory"
import { InMemoryNotificatinsRepository } from "@test/repositories/InMemoryNotificatinsRepository"
import { GetRecipientNotificationsUseCase } from "./GetRecipientNotificationsUseCase"

describe('Get Recipient Notifications', () => {
    it('should be able to get recipient notifications', async () => {
        const inMemoryNotificatinsRepository = new InMemoryNotificatinsRepository()
        const getRecipientNotificationsUseCase = new GetRecipientNotificationsUseCase(
            inMemoryNotificatinsRepository
        )

        await inMemoryNotificatinsRepository
            .create(makeNotification({ recipientId: 'recipient-1' }))

        await inMemoryNotificatinsRepository
            .create(makeNotification({ recipientId: 'recipient-1' }))

        await inMemoryNotificatinsRepository
            .create(makeNotification({ recipientId: 'recipient-2' }))

        const { notifications } = await getRecipientNotificationsUseCase.execute({
            recipientId: 'recipient-1'
        })

        expect(notifications).toHaveLength(2)
        expect(notifications).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ recipientId: 'recipient-1' }),
                expect.objectContaining({ recipientId: 'recipient-1' })
            ])
        )
    })
})