import { dbContext } from "../db/DbContext.js"

class TowerCommentsService {

  async getCommentsByEventId(eventId) {
    const towerComments = await dbContext.TowerComments.find({ eventId: eventId}).populate('creator')
    return towerComments
  }


  async createComment(commentData) {
    const towerComment = await dbContext.TowerComments.create(commentData)
    await towerComment.populate('creator')
    return towerComment
  }

}

export const towerCommentsService = new TowerCommentsService()