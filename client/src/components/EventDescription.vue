<script setup>
import { AppState } from '@/AppState.js';
import { towerEventsService } from '@/services/TowerEventsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const towerEvent = computed(() => AppState.activeTowerEvent)
const account = computed(() => AppState.account)
const route = useRoute()

async function cancelTowerEvent() {
  try {

    const confirmed = await Pop.confirm(`Are you sure you want to ${towerEvent.value.isCanceled ? 'reinstate' : 'cancel'} this event?`, 'Note: This can be undone at a later time should you choose.', 'YES', 'NO')
    if (!confirmed) { return }

    const eventId = route.params.eventId
    await towerEventsService.cancelTowerEvent(eventId)
  }
  catch (error) {
    Pop.error(error, 'Could not cancel tower event');
    logger.error('could not cancel tower event'.toUpperCase(), error);
  }
}
</script>


<template>
  <div class="d-flex gap-2 align-items-center justify-content-between mb-3 mt-4">
    <div class="d-flex gap-2 align-items-center">
      <h2 :class="`mb-0 ${towerEvent.isCanceled ? 'text-decoration-line-through' : ''}`">{{ towerEvent.name }}
      </h2>
      <span class="px-2 bg-secondary text-info rounded-pill">{{ towerEvent.type }}</span>
    </div>
    <div @click="cancelTowerEvent()" v-if="account?.id == towerEvent.creatorId">
      <span class="mdi mdi-cancel fs-4 text-warning"
            :title="`${towerEvent.isCanceled ? 'Undo Cancellation' : 'Cancel Event'}`" role="button">{{
              towerEvent.isCanceled ? 'CANCELED' : '' }}</span>
    </div>
  </div>
  <div class="mb-2">
    <p class="mb-0">{{ towerEvent.description }}</p>
  </div>
  <div class="mb-2">
    <p class="mb-0 fw-bold fs-5">Date and Time</p>
    <div class="d-flex gap-2">
      <span class="mdi mdi-calendar-clock text-primary"></span>
      <p class="mb-0">Starts {{ towerEvent.startDate.toLocaleString() }}</p>
    </div>
  </div>

  <div class="mb-2">
    <p class="mb-0 fw-bold fs-5">Location</p>
    <div class="d-flex gap-2">
      <span class="mdi mdi-map-marker text-primary"></span>
      <p class="mb-0">{{ towerEvent.location }}</p>
    </div>
  </div>
</template>


<style lang="scss" scoped>

</style>