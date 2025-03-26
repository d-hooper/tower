import { dbContext } from "../db/DbContext.js"

class TicketsService {

  async reserveTicket(eventData) {
    const ticket = await dbContext.Tickets.create(eventData)
    await ticket.populate('profile event')
    return ticket
  }

  async getTicketsByAccountId(userId) {
    const tickets = await dbContext.Tickets
      .find({ accountId: userId })
      .populate('event profile')
    return tickets
  }

  async getTicketsByEventId(eventId) {
    const tickets = await dbContext.Tickets
    .find({eventId: eventId})
    .populate('profile')
    return tickets
  }

}
export const ticketsService = new TicketsService()