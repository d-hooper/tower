import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Ticket } from "@/models/Ticket.js"
import { AppState } from "@/AppState.js"

class TicketsService {
  async reserveTicket(eventData) {
    const response = await api.post('api/tickets', eventData)
    logger.log(response.data)
    const ticket = new Ticket(response.data)
    AppState.tickets.push(ticket)
  }
}

export const ticketsService = new TicketsService()