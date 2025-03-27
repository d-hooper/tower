import { TowerComment } from "@/models/TowerComment.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"

class TowerCommentsService {
  
  async getComments(eventId) {
    const response = await api.get(`api/events/${eventId}/comments`)
    const towerComments = response.data.map(towerComment => new TowerComment(towerComment))
    AppState.towerComments = towerComments
  }
  
  async postComment(towerCommentData) {
    const response = await api.post('api/comments', towerCommentData)
    const comment = new TowerComment(response.data)
    AppState.towerComments.push(comment)
  }
  
}

export const towerCommentsService = new TowerCommentsService()