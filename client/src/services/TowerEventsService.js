import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { TowerEvent } from "@/models/TowerEvent.js"
import { AppState } from "@/AppState.js"

class TowerEventsService {
  async getAllTowerEvents() {
    const response = await api.get('api/events')
    const towerEvents = response.data.map(towerEvent => new TowerEvent(towerEvent))
    AppState.towerEvents = towerEvents
  }

}

export const towerEventsService = new TowerEventsService()