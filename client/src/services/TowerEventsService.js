import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"

class TowerEventsService {
  async getAllTowerEvents() {
    const response = await api.get('api/events')
    logger.log(response.data)
  }

}

export const towerEventsService = new TowerEventsService()