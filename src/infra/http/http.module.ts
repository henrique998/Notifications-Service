import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { NotificationsController } from "./controllers/notifications.controller";

import { SendNotificationUseCase } from "@app/useCases/SendNotificationUseCase";
import { CancelNotificationUseCase } from "@app/useCases/CancelNotificationUseCase";
import { ReadNotificationUseCase } from "@app/useCases/ReadNotificationUseCase";
import { UnreadNotificationUseCase } from "@app/useCases/UnreadNotificationUseCase";
import { CountRecipientNotificationsUseCase } from "@app/useCases/CountRecipientNotificationsUseCase";
import { GetRecipientNotificationsUseCase } from "@app/useCases/GetRecipientNotificationsUseCase";

@Module({
    imports: [DatabaseModule],
    controllers: [NotificationsController],
    providers: [
        SendNotificationUseCase,
        CancelNotificationUseCase,
        ReadNotificationUseCase,
        UnreadNotificationUseCase,
        CountRecipientNotificationsUseCase,
        GetRecipientNotificationsUseCase,
    ]
})
export class HttpModule { }