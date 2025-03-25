import { Auth0Provider } from "@bcwdev/auth0provider";
import { towerEventsService } from "../services/TowerEventsService.js";
import BaseController from "../utils/BaseController.js";

export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events');
    this.router
    .get('', this.getAllEvents)
    .get('/:eventId', this.getEventById)
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.createEvent)
  }

  /**
 * Creates a new value from request body and returns the value
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 * @param {import("express").NextFunction} next
 */

  async getAllEvents(request, response, next) {
    try {
      const events = await towerEventsService.getAllEvents()
      response.send(events)
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
      const event = await towerEventsService.getEventById(eventId)
      response.send(event)
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
      const event = await towerEventsService.createEvent(eventData)
      response.send(event)
    }
    catch (error){
      next(error);
    }
  }
}