import { makeAutoObservable } from "mobx"

export default class MessageStore {
    constructor() {
        this._messages = []
        makeAutoObservable(this)
    }

    setMessages(message) {
        this._messages = message
    }

    get messages() {
        return this._messages
    }

    markedMessage(id) {
        for (let message of this.messages) {
            if (message.id == id) {
                message.SenderStarred = !message.SenderStarred
                message.ReceiverStarred = !message.ReceiverStarred
            }
        }
    }

    removeMessage(id) {
        for (let message of this.messages) {
            if (message.id == id) {
                const indexOf = this.messages.indexOf(message)
                this.messages.splice(indexOf, 1)
            }
        }
    }

    readThisMessage(id) {
        for (let message of this.messages) {
            if (message.id == id) {
                message.status = true
            }
        }
    }
}