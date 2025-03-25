<script setup>
import { AppState } from '@/AppState.js';
import TowerEventSmallCard from '@/components/TowerEventSmallCard.vue';
import { towerEventsService } from '@/services/TowerEventsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';

const towerEvents = computed(() => AppState.towerEvents)

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
    <div class="row">
      <div class="col-12">
        <div class="hero-image d-flex align-items-center">
          <div class="text-light hero-text p-3 rounded">
            <h2 class="fs-4">Create and Find Local Events</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi facere, officia reprehenderit inventore
              neque quisquam obcaecati iste quis.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="container">
    <div class="row justify-content-center mt-3">
      <div class="col-lg-10">
        <h2>How Tower Works</h2>
      </div>
    </div>
    <div class="row d-flex justify-content-evenly mt-3">
      <div class="col-md-4">
        <div class="d-flex justify-content-between bg-light rounded p-4">
          <span class="mdi mdi-magnify text-success fs-3 me-2"></span>
          <div>
            <p class="mb-0 fs-5">Find Events that Match Your Interests</p>
            <p class="mb-0 fs-6">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem quis fuga qui.</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="d-flex justify-content-between bg-light rounded p-4" role="button">
          <span class="mdi mdi-plus text-success fs-3 me-2"></span>
          <div>
            <p class="mb-0 fs-5">Plan Your Own Event</p>
            <p class="mb-0 fs-6">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem quis fuga qui.</p>
            <span class="text-success mt-3">Create an Event</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-3 justify-content-center">
      <div class="col-lg-10">
        <h2>Explore Event Categories</h2>
      </div>
    </div>
    <div class="row mt-3 justify-content-center">
      <div class="col-lg-10">
        <h2>Upcoming Events</h2>
      </div>
      <div class="col-12">
        <div class="row">
          <div v-for="towerEvent in towerEvents" :key="towerEvent.id" class="col-md-6 col-lg-4">
            <TowerEventSmallCard :towerEvent="towerEvent" />
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<style scoped lang="scss">
.hero-image {
  background-image: url('https://images.unsplash.com/photo-1464207687429-7505649dae38?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  background-position: center;
  min-height: 80dvh;
}

.hero-text {
  max-width: 450px;
  margin-left: 5rem;
  margin-bottom: 12.5rem;
  background-color: #1a1919cc;
  backdrop-filter: blur(4px);
}


@media screen and (max-width: 576px) {
  .hero-image {
    align-items: flex-start !important;
    background-position: left;
  }

  .hero-text {
    margin: 1.5rem 0.5rem 0 0.5rem;
  }
}
</style>
