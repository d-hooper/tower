import { Profile } from "./Account.js"

export class Ticket {

  constructor(data) {
    this.id = data.id
    this.accountId = data.accountId
    this.eventId = data.eventId
    this.profile = new Profile(data.profile)
    
  }
}