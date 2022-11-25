import { makeAutoObservable } from "mobx"

export default class LinkStore {
    constructor() {
        this._links = []
        makeAutoObservable(this)
    }

    setLinks(links) {
        this._links = links
    }

    get links() {
        return this._links
    }

    removeLink(id) {
        for (let link of this.links) {
            if (link.id == id) {
                const indexOf = this.links.indexOf(link)
                this.links.splice(indexOf, 1)
            }
        }
    }

    editLink(id, newTitle, newLink) {
        for (let link of this.links) {
            if (link.id == id) {
                link.title = newTitle
                link.link = newLink
            }
        }
    }
}