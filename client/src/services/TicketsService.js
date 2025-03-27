import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Attendee, TicketedEvent } from "@/models/Ticket.js"
import { AppState } from "@/AppState.js"

class TicketsService {
  async reserveTicket(eventData) {
    const response = await api.post('api/tickets', eventData)
    logger.log(response.data)
    const ticket = new Attendee(response.data)
    AppState.attendees.push(ticket)
    AppState.activeTowerEvent.ticketCount++
  }
  
  async getTicketsByAccountId() {
    const response = await api.get('account/tickets')
    logger.log(response.data)
    const ticketedEvents = response.data.map(ticketedEvent => new TicketedEvent(ticketedEvent))
    AppState.ticketedEvents = ticketedEvents
  }
  
  async deleteTicket(ticketId) {
    const response = await api.delete(`api/tickets/${ticketId}`)
    logger.log(response.data)
    const ticketIndex = AppState.ticketedEvents.findIndex(ticket => ticket.id == ticketId)
    AppState.ticketedEvents.splice(ticketIndex, 1)
  }

}

export const ticketsService = new TicketsService()