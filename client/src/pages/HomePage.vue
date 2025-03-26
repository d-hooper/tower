<script setup>
import { AppState } from '@/AppState.js';
import EventSmallCard from '@/components/EventSmallCard.vue';
import HeroSection from '@/components/HeroSection.vue';
import NewEventModal from '@/components/NewEventModal.vue';
import TowerInfo from '@/components/TowerInfo.vue';
import { towerEventsService } from '@/services/TowerEventsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted, ref } from 'vue';

const towerEvents = computed(() => {
  if (selectedFilter.value == 'all') {
    return AppState.towerEvents
  }

  return AppState.towerEvents.filter(towerEvent => towerEvent.type == selectedFilter.value)
})
const selectedFilter = ref('all')
const eventFilters = [
  { name: 'convention', mdi: 'mdi-account-group', color: 'primary' },
  { name: 'sport', mdi: 'mdi-baseball', color: 'info' },
  { name: 'concert', mdi: 'mdi-guitar-electric', color: 'danger' },
  { name: 'digital', mdi: 'mdi-monitor', color: 'warning' },
  { name: 'all', mdi: 'mdi-all-inclusive', color: 'success' },
]

onMounted(() => {
  getAllTowerEvents()
})

async function getAllTowerEvents() {
  try {
    await towerEventsService.getAllTowerEvents()
  }
  catch (error) {
    Pop.error(error, 'Could not get events');
    logger.error('COULD NOT GET EVENTS', error)
  }
}

</script>

<template>
  <section class="container-fluid px-0">
    <HeroSection />
  </section>
  <section class="container">
    <TowerInfo />
    <div class="row mt-3 justify-content-center">
      <div class="col-xl-10">
        <h2 class="fs-4 fw-bold">Explore Event Categories</h2>
      </div>
      <div class="col-xl-10">
        <div class="row justify-content-evenly my-3">
          <div @click="selectedFilter = eventFilter.name" v-for="eventFilter in eventFilters" :key="eventFilter.name"
               class="col-md-2">
            <div class="rounded bg-light text-center py-1 filter-button" type="button"
                 :style="{ borderColor: `var(--bs-${eventFilter.color}` }">
              <span :class="`mdi ${eventFilter.mdi} text-${eventFilter.color} fs-3`"></span>
              <p class="mb-0 fs-6 fw-bold text-capitalize">{{ eventFilter.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-3 justify-content-center">
      <div class="col-xl-10">
        <h2 class="fs-4 fw-bold">Upcoming Events</h2>
      </div>
      <div class="col-xl-10">
        <div class="row mt-3">
          <div v-for="towerEvent in towerEvents" :key="towerEvent.id" class="col-md-6 col-lg-4">
            <EventSmallCard :towerEvent="towerEvent" />
          </div>
        </div>
      </div>
    </div>
  </section>
  <NewEventModal />
</template>

<style scoped lang="scss">
.filter-button {
  border-width: 2px;
  border-style: solid;
  transition: transform .35s ease-in-out;
}

.filter-button:hover {
  transform: translateY(-5px) // transition: ease
}
</style>
