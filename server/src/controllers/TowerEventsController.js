import { Auth0Provider } from "@bcwdev/auth0provider";
import { towerEventsService } from "../services/TowerEventsService.js";
import BaseController from "../utils/BaseController.js";
import { ticketsService } from "../services/TicketsService.js";

export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events');
    this.router
    .get('', this.getAllEvents)
    .get('/:eventId', this.getEventById)
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.createEvent)
    .put('/:eventId', this.editEvent)
    .delete('/:eventId', this.cancelEvent)
    .get('/:eventId/tickets', this.getTicketsByEventId)
  }

  /**
 * Creates a new value from request body and returns the value
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 * @param {import("express").NextFunction} next
 */

  async getAllEvents(request, response, next) {
    try {
      const towerEvents = await towerEventsService.getAllEvents()
      response.send(towerEvents)
    }
    catch (error){
      next(error);
    }
  }

  /**
 * Creates a new value from request body and returns the value
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 * @param {import("express").NextFunction} next
 */

  async getEventById(request, response, next) {
    try {
      const eventId = request.params.eventId
      const towerEvent = await towerEventsService.getEventById(eventId)
      response.send(towerEvent)
    }
    catch (error){
      next(error);
    }
  }
 
  /**
 * Creates a new value from request body and returns the value
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 * @param {import("express").NextFunction} next
 */

  async getTicketsByEventId(request, response, next) {
    try {
      const eventId = request.params.eventId
      const tickets = await ticketsService.getTicketsByEventId(eventId)
      response.send(tickets)
    }
    catch (error){
      next(error);
    }
  }

  /**
 * Creates a new value from request body and returns the value
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 * @param {import("express").NextFunction} next
 */

  async createEvent(request, response, next) {
    try {
      const eventData = request.body
      const userId = request.userInfo.id
      eventData.creatorId = userId
      const towerEvent = await towerEventsService.createEvent(eventData)
      response.send(towerEvent)
    }
    catch (error){
      next(error);
    }
  }

  
  /**
 * Creates a new value from request body and returns the value
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 * @param {import("express").NextFunction} next
  */
 
 async editEvent(request, response, next) {
   try {
     const eventId = request.params.eventId
     const eventData = request.body
     const userInfo = request.userInfo
     const towerEvent = await towerEventsService.editEvent(eventId, userInfo, eventData)
     response.send(towerEvent)
    }
    catch (error){
      next(error);
    }
  }
  
  /**
  * Creates a new value from request body and returns the value
  * @param {import("express").Request} request
  * @param {import("express").Response} response
  * @param {import("express").NextFunction} next
  */
  
  async cancelEvent(request, response, next) {
    try {
      const eventId = request.params.eventId
      const userInfo = request.userInfo
      const message = await towerEventsService.cancelEvent(eventId, userInfo)
      response.send(message)
    }
    catch (error){
      next(error);
    }
  }
}