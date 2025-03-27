import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TicketsService {
  
  async reserveTicket(eventData) {
    const ticket = await dbContext.Tickets.create(eventData)
    await ticket.populate('profile event')
    return ticket
  }
  
  async getTicketsByAccountId(userId) {
    const tickets = await dbContext.Tickets
    .find({ accountId: userId })
    .populate('profile')
    .populate({
      path: 'event', 
      populate: {
        path: 'creator ticketCount',
        select: 'name picture'
      }
    })
    return tickets
  }
  
  async getTicketsByEventId(eventId) {
    const tickets = await dbContext.Tickets
    .find({eventId: eventId})
    .populate('profile')
    return tickets
  }
  
  async deleteReservedTicket(ticketId, userInfo) {
    const ticket = await dbContext.Tickets.findById(ticketId)
    if (!ticket) { throw new BadRequest(`Invalid Ticket Id: ${ticketId}`)}
    if(ticket.accountId != userInfo.id) {
      throw new Forbidden(`Cannot delete another user's ticket(s), ${userInfo.nickname}`.toUpperCase())
    }
    await ticket.deleteOne()
    return `Ticket no longer reserved`
  }
  
}
export const ticketsService = new TicketsService()