import { dbContext } from "../db/DbContext.js"

class TowerCommentsService {
  
  
  async createComment(commentData) {
    const comment = await dbContext.TowerComments.create(commentData)
    await comment.populate('creator')
    return comment
  }

}

export const towerCommentsService = new TowerCommentsService()