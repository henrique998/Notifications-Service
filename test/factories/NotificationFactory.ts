import { Content } from '@app/entities/content'
import { Notification, NotificationProps } from '@app/entities/notifcation'

type Override = Partial<NotificationProps>

export function makeNotification(override: Override = {}) {
    return new Notification({
        category: 'social',
        content: new Content('This is a notication'),
        recipientId: 'recipient-1',
        ...override
    })
}