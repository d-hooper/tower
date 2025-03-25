import { dbContext } from "../db/DbContext.js"

class TowerEventsService {
  
  async getAllEvents() {
    const events = await dbContext.TowerEvents.find().populate('creator')
    return events
  }

  async createEvent(eventData) {
    const event = await dbContext.TowerEvents.create(eventData)
    await event.populate('creator')
    return event
  }

}

export const towerEventsService = new TowerEventsService()