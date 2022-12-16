import { SendNotificationUseCase } from "@app/useCases/SendNotificationUseCase";
import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";

interface IPayload {
    content: string
    category: string
    recipientId: string
}

@Controller()
export class NotificationsController {
    constructor(
        private sendNotificationUseCase: SendNotificationUseCase
    ) { }

    @EventPattern('notifications.send-notification')
    async handle(@Payload() { category, content, recipientId }: IPayload) {
        await this.sendNotificationUseCase.execute({
            category,
            content,
            recipientId,
        })
    }
}