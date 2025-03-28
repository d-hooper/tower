import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { TowerEvent } from "@/models/TowerEvent.js"
import { AppState } from "@/AppState.js"
import { Attendee } from "@/models/Ticket.js"

class TowerEventsService {
  
 
  
  async getAllTowerEvents() {
    const response = await api.get('api/events')
    const towerEvents = response.data.map(towerEvent => new TowerEvent(towerEvent))
    AppState.towerEvents = towerEvents
    // const account = AppState.account
    // const creatorEvents = towerEvents.filter(towerEvent => towerEvent.creatorId == account?.id)
    // logger.log('creator events', AppState.creatorEvents)
    // AppState.creatorEvents = creatorEvents
  }
  
  async getTowerEventById(eventId) {
    const response = await api.get(`api/events/${eventId}`)
    const towerEvent = new TowerEvent(response.data)
    AppState.activeTowerEvent = towerEvent
    logger.log(AppState.activeTowerEvent)
  }
  
  async createTowerEvent(eventData) {
    const response = await api.post('api/events', eventData)
    const newTowerEvent = new TowerEvent(response.data)
    AppState.towerEvents.push(newTowerEvent)
    return newTowerEvent
  }
  
  async cancelTowerEvent(eventId) {
    const response = await api.delete(`api/events/${eventId}`)
    logger.log(response.data)
    AppState.activeTowerEvent.isCanceled = !AppState.activeTowerEvent.isCanceled
  }

  async getTicketsByEventId(eventId) {
    const response = await api.get(`api/events/${eventId}/tickets`)
    const attendees = response.data.map(attendee => new Attendee(attendee))
    AppState.attendees = attendees
  }
}

export const towerEventsService = new TowerEventsService()