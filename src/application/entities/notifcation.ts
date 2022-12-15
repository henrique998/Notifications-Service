import { randomUUID } from 'node:crypto'

import { Replace } from "src/helpers/replace"
import { Content } from "./content"

export interface NotificationProps {
    recipientId: string
    content: Content
    category: string
    readyAt?: Date | null
    canceledAt?: Date | null
    createdAt: Date
}

class Notification {
    private _id: string
    private props: NotificationProps

    constructor(props: Replace<NotificationProps, { createdAt?: Date }>, id?: string) {
        this._id = id ?? randomUUID()
        this.props = {
            ...props,
            createdAt: props.createdAt ?? new Date()
        }
    }

    public get id(): string {
        return this._id
    }

    public set recipientId(recipientId: string) {
        this.props.recipientId = recipientId
    }

    public get recipientId(): string {
        return this.props.recipientId
    }

    public set content(content: Content) {
        this.props.content = content
    }

    public get content(): Content {
        return this.props.content
    }

    public set category(category: string) {
        this.props.category = category
    }

    public get category(): string {
        return this.props.category
    }

    public read() {
        this.props.readyAt = new Date()
    }

    public unread() {
        this.props.readyAt = null
    }

    public get readyAt(): Date | undefined | null {
        return this.props.readyAt
    }

    public cancel() {
        return this.props.canceledAt = new Date()
    }

    public get canceledAt(): Date | undefined | null {
        return this.props.canceledAt
    }

    public get createdAt(): Date {
        return this.props.createdAt
    }
}

export { Notification }