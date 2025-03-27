import { Profile } from "./Account.js"
import { TowerEvent } from "./TowerEvent.js"

class Ticket {
  constructor(data) {
    this.id = data.id
    this.accountId = data.accountId
    this.eventId = data.eventId
  }
}

export class Attendee extends Ticket {
  constructor(data) {
    super(data)
    this.profile = new Profile(data.profile)
    
  }
}
export class TicketedEvent extends Ticket {
  constructor(data) {
    super(data)
    this.towerEvent = new TowerEvent(data.event)
  }
}