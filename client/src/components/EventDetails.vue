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
  <div v-if="towerEvent" class="row justify-content-center mt-4">
    <div class="col-12">
      <div id="cover-bg" class="text-center rounded-5 w-100" :style="{ backgroundImage: `url(${towerEvent.coverImg})` }">
        <img :src="towerEvent.coverImg" alt="`Photo for the ${{  }}`" class="details-img">
      </div>
    </div>
    <div class="col-md-6 col-lg-8">
      <div class="mt-4">
        <div>
          <div class="d-flex gap-2 align-items-center justify-content-between mb-3">
            <div class="d-flex gap-2 align-items-center">
              <h2 :class="`mb-0 ${towerEvent.isCanceled ? 'text-decoration-line-through' : ''}`">{{ towerEvent.name }}</h2>
              <span class="py-1 px-2 bg-secondary text-info rounded-pill">{{ towerEvent.type }}</span>
            </div>
            <div @click="cancelTowerEvent()" v-if="account?.id == towerEvent.creatorId">
              <span class="mdi mdi-cancel fs-4 text-warning" :title="`${towerEvent.isCanceled ? 'Undo Cancellation' : 'Cancel Event'}`" role="button" >{{ towerEvent.isCanceled ? 'CANCELED' : ''}}</span>
            </div>
          </div>
          <div class="mb-2">
            <p class="mb-0">{{ towerEvent.description }}</p>
          </div>
          <div class="mb-2">
            <p class="mb-0 fw-bold fs-5">Date and Time</p>
            <div class="d-flex gap-2">
              <span class="mdi mdi-calendar-clock text-primary"></span>
              <p class="mb-0">Starts {{ towerEvent.startDate.toLocaleTimeString() }}</p>
            </div>
          </div>
          <div class="mb-2">
            <p class="mb-0 fw-bold fs-5">Location</p>
            <div class="d-flex gap-2">
              <span class="mdi mdi-map-marker text-primary"></span>
              <p class="mb-0">{{ towerEvent.location }}</p>
            </div>
          </div>
          <div class="my-2">
            <p class="fs-5 fw-bold">Comments</p>
            <div class="bg-light">

              <!-- TODO Comment Form -->

              <!-- TODO Printed Comments w/ remove button for logged in user -->

            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-2 col-lg-1"></div>
    <div class="col-10 col-sm-6 col-md-4 col-lg-3">
      <div class="bg-light text-center my-4 py-3 px-1 rounded">
        <p class="fs-5 fw-bold text-gray">Interested in going?</p>
        <p class="fs-6">Grab a ticket</p>
        <button type="button" title="Reserve a ticket" class="btn btn-primary text-light">Reserve</button>
      </div>
      <div class="mt-4">
        <h3 class="fs-5 mb-1">Attendees</h3>
        <div class="bg-light py-3 px-1 rounded">
          <p>Johann Smithe</p>
          <p>Regina Forte</p>
          <p>Horace Wilsby</p>
          <p>Grace Andraste</p>
          <p>Taylor Baker</p>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.details-img {
  max-height: 40dvh;
  background-repeat: initial;
  background-position: center;
  background-size: contain;
}
</style>