import { Profile } from "./Account.js"

export class TowerComment {
  constructor(data) {
    this.id = data.id
    this.creator = new Profile(data.creator)
    this.creatorId = data.creatorId
    this.body = data.body
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
  }
}