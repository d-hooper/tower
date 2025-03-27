<script setup>
import { AppState } from '@/AppState.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import EventDescription from './EventDescription.vue';
import { ticketsService } from '@/services/TicketsService.js';

const towerEvent = computed(() => AppState.activeTowerEvent)
const account = computed(() => AppState.account)
const attendees = computed(() => AppState.attendees)
const remainingSpots = computed(() => (towerEvent.value.capacity - towerEvent.value.ticketCount) )
const route = useRoute()

async function reserveTicket() {
  try {
    const eventData = { eventId: route.params.eventId }
    await ticketsService.reserveTicket(eventData)
    Pop.toast(`You reserved a ticket for ${towerEvent.value.name}`)
  }
  catch (error) {
    Pop.error(error, `Could not reserve ticket for ${towerEvent.value.name}`);
    logger.error(`Could not reserve ticket for ${towerEvent.value.name}`.toUpperCase(), error);
  }
}

</script>


<template>
  <div v-if="towerEvent" class="row justify-content-center mt-4">
    <div class="col-12">
      <div id="cover-bg" class="text-center rounded-5 w-100"
           :style="{ backgroundImage: `url(${towerEvent.coverImg})` }">
        <img :src="towerEvent.coverImg" :alt="`Photo for the ${towerEvent.name}`" class="details-img">
      </div>
    </div>
    <div class="col-md-6 col-lg-8">
      <EventDescription />
      <div class="mt-5">
        <p class="fs-5 fw-bold">Comments</p>
        <div class="bg-light">

          <!-- TODO Comment Form -->

          <!-- TODO Printed Comments w/ remove button for logged in user -->

        </div>
      </div>
    </div>
    <div class="col-md-1"></div>
    <div class="col-10 col-sm-6 col-md-3">
      <div class="bg-light text-center mt-4 py-3 px-1 rounded">
        <p class="fs-5 fw-bold text-gray">Interested in going?</p>
        <p class="fs-6">Grab a ticket</p>
        <button @click="reserveTicket()" type="button" title="Reserve a ticket" class="btn btn-primary text-light"
                :disabled="towerEvent.isCanceled || remainingSpots == 0">Reserve</button>
      </div>
      <p class="mb-0 text-end">
        <span :class="`${ remainingSpots == 0 ? 'text-warning' : 'text-success'}`">
          {{ remainingSpots }}
        </span>
        {{`${remainingSpots == 1 ? 'spot' : 'spots'} left` }}
      </p>
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
  max-height: 50dvh;
  background-repeat: initial;
  background-position: center;
  background-size: contain;
  width: 65%
}
</style>