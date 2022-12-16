import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";

@Controller()
export class NotificationsController {

    @EventPattern('notifications.send-notification')
    async handle() {
        console.log('notification')
    }
}