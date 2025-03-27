import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors.js"
import { dbContext } from "../db/DbContext.js"

class TowerCommentsService {


  async getCommentsByEventId(eventId) {
    const towerComments = await dbContext.TowerComments.find({ eventId: eventId }).populate('creator')
    return towerComments
  }

  async createComment(commentData) {
    const towerComment = await dbContext.TowerComments.create(commentData)
    await towerComment.populate('creator')
    return towerComment
  }

  async deleteComment(towerCommentId, userInfo) {
    const toDelete = await dbContext.TowerComments.findById(towerCommentId)

    if (!toDelete) { throw new BadRequest(`Invalid Comment ID: ${towerCommentId}`) }
    if (toDelete.creatorId != userInfo.id) {
      throw new Forbidden(`You cannot delete other users' comments ${userInfo.nickname}`.toUpperCase());
    }

    await toDelete.deleteOne()
    return `Comment was deleted`
  }
}

export const towerCommentsService = new TowerCommentsService()