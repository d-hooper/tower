export class TowerEvent {
  constructor(data) {
    this.id = data.id
    this.creatorId = data.creatorId
    this.creator = data.creator
    this.title = data.title
    this.description = data.description
    this.coverImg = data.coverImg
    this.location = data.location
    this.type = data.type
    this.ticketCount = data.ticketCount
    this.startDate = new Date(data.startDate)
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
  }
}