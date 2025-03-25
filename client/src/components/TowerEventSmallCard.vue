<script setup>
import { TowerEvent } from '@/models/TowerEvent.js';

defineProps({
  towerEvent: { type: TowerEvent, required: true }
}
)
</script>


<template>
  <div class="card mb-3 rounded-3" role="button" :title="`Details for the ${towerEvent.name} event`">
    <div class="event-cover-img rounded-top-3" :style="{ backgroundImage: `url(${towerEvent.coverImg})` }">
      <span></span>
    </div>
    <div class="ms-2 my-2">
      <p class="mb-0 fw-bold fs-5">{{ towerEvent.name }}</p>
      <p class="mb-0">Hosted by {{ towerEvent.creator.name }}</p>
      <p class="mb-0">{{ towerEvent.startDate.toLocaleDateString() }}</p>
      <!-- TODO Add ticket count to page -->
      <p class="mb-0"># of people attending</p>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.event-cover-img {
  height: 25dvh;
  width: 100%;
  background-size: cover;
  background-position: center;
}

.card:hover {

  box-shadow: 5px 5px 10px var(--bs-primary);
}
</style>