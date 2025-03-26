<script setup>
import { TowerEvent } from '@/models/TowerEvent.js';

defineProps({
  towerEvent: { type: TowerEvent, required: true }
}
)
</script>


<template>
  <RouterLink :to="{name: 'EventDetails', params: {eventId: towerEvent.id}}">
  <div class="card mb-3 rounded-3" role="button" :title="`Details for the ${towerEvent.name} event`">
    <div class="event-cover-img rounded-top-3" :style="{ backgroundImage: `url(${towerEvent.coverImg})` }">
      <span></span>
    </div>
    <div class="ms-2 my-2">
      <div class="d-flex justify-content-between me-2">
        <p :class="`mb-0 fw-bold fs-5 ${towerEvent.isCanceled ? 'text-decoration-line-through' : ''}`">{{ towerEvent.name }}</p>
        <span v-if="towerEvent.isCanceled" class="bg-warning rounded-pill text-light px-2">Cancelled</span>
      </div>
      <p class="mb-0">Hosted by {{ towerEvent.creator.name }}</p>
      <p class="mb-0">{{ towerEvent.startDate.toLocaleDateString() }}</p>
      <!-- TODO Add ticket count to page -->
      <p class="mb-0"># of people attending</p>
    </div>
  </div>
  </RouterLink>
</template>


<style lang="scss" scoped>
.event-cover-img {
  height: 25dvh;
  width: 100%;
  background-size: cover;
  background-position: center;
}

.card:hover {
  box-shadow: 3px 3px 30px var(--bs-codeworks);
}

a {
  text-decoration: none;
}
</style>