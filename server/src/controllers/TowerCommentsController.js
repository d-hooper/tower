import { Auth0Provider } from "@bcwdev/auth0provider/lib/Auth0Provider.js";
import BaseController from "../utils/BaseController.js";
import { towerCommentsService } from "../services/TowerCommentsService.js";

export class TowerCommentsController extends BaseController {

  constructor() {
    super('api/comments');
    this.router
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.createComment)
    .delete('/:commentId', this.deleteComment)
  }

  /**
 * Creates a new value from request body and returns the value
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 * @param {import("express").NextFunction} next
 */
  async createComment(request, response, next) {
    try {
      const userId = request.userInfo.id
      const commentData = request.body
      commentData.creatorId = userId
      const towerComment = await towerCommentsService.createComment(commentData)
      response.send(towerComment)
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
  async deleteComment(request, response, next) {
    try {
      const userInfo = request.userInfo
      const towerCommentId = request.params.commentId
      const message = await towerCommentsService.deleteComment(towerCommentId, userInfo)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }

}