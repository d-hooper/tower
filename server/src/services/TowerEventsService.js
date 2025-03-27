import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TowerEventsService {

  async getAllEvents() {
    const events = await dbContext.TowerEvents
      .find()
      .populate('creator ticketCount')
      // .sort('startDate')
    return events
  }

  async getEventById(eventId) {
    const event = (await dbContext.TowerEvents
      .findById(eventId))
      .populate('creator ticketCount')

    if (!event) {
      throw new BadRequest(`No Tower Event found with Id of ${eventId}`)
    }

    return event
  }

  async createEvent(eventData) {
    const event = await dbContext.TowerEvents.create(eventData)
    await event.populate('creator ticketCount')
    return event
  }

  async editEvent(eventId, userInfo, eventData) {
    const event = await this.getEventById(eventId)

    if (event.creatorId != userInfo.id) {
      throw new Forbidden(`CANNOT EDIT EVENTS CREATED BY OTHER USERS ${userInfo.nickname.toUpperCase()}`)
    }

    if (event.isCanceled) {
      throw new BadRequest(`CANNOT EDIT CANCELED EVENTS`)
    }

    event.name = eventData.name ?? event.name
    event.description = eventData.description ?? event.description

    await event.save()

    return event
  }

  async cancelEvent(eventId, userInfo) {
    const event = await this.getEventById(eventId)

    if (event.creatorId != userInfo.id) {
      throw new Forbidden(`CANNOT CANCEL EVENTS CREATED BY OTHER USERS ${userInfo.nickname.toUpperCase()}`)
    }

    event.isCanceled = !event.isCanceled

    await event.save()

    // @ts-ignore
    return `Toggled the canceled status for the "${event.title}" event`
  }
}

export const towerEventsService = new TowerEventsService()