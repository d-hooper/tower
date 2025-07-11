import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { ticketsService } from "../services/TicketsService.js";

export class TicketsController extends BaseController {

  constructor() {
    super('api/tickets');
    this.router
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.reserveTicket)
    .delete('/:ticketId', this.deleteReservedTicket)
    
  }

  /**
 * Creates a new value from request body and returns the value
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 * @param {import("express").NextFunction} next
 */
  async reserveTicket(request, response, next) {
    try {
      const userId = request.userInfo.id
      const eventData = request.body
      eventData.accountId = userId
      const ticket = await ticketsService.reserveTicket(eventData)
      response.send(ticket)
    } catch (error) {
      next(error)
    }
  }

  /**
 * Creates a new value from request body and returns the value
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 * @param {import("express").NextFunction} next
 */
  async deleteReservedTicket(request, response, next) {
    try {
      const userInfo = request.userInfo
      const ticketId = request.params.ticketId
      const message = await ticketsService.deleteReservedTicket(ticketId, userInfo)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }


}