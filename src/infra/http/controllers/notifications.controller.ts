import { Body, Controller, Post, Patch, Get, Param } from '@nestjs/common'

import { CreateNotificationBody } from '../dtos/create-notification-body'
import { NotificationViewModel } from '../viewModels/NotificationViewModel'

import { SendNotificationUseCase } from '@app/useCases/SendNotificationUseCase'
import { CancelNotificationUseCase } from '@app/useCases/CancelNotificationUseCase'
import { ReadNotificationUseCase } from '@app/useCases/ReadNotificationUseCase'
import { UnreadNotificationUseCase } from '@app/useCases/UnreadNotificationUseCase'
import { CountRecipientNotificationsUseCase } from '@app/useCases/CountRecipientNotificationsUseCase'
import { GetRecipientNotificationsUseCase } from '@app/useCases/GetRecipientNotificationsUseCase'

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotificationUseCase,
    private cancelNotification: CancelNotificationUseCase,
    private readNotification: ReadNotificationUseCase,
    private unreadNotification: UnreadNotificationUseCase,
    private countRecipientNotifications: CountRecipientNotificationsUseCase,
    private getRecipientNotifications: GetRecipientNotificationsUseCase,
  ) { }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id
    })
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId
    })

    return count
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId
    })

    return {
      notifications: notifications.map(NotificationViewModel.toHTTP)
    }
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id
    })
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id
    })
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { notification } = await this.sendNotification.execute({
      category: body.category,
      content: body.content,
      recipientId: body.recipientId,
    })

    return {
      notification: NotificationViewModel.toHTTP(notification)
    }
  }
}
