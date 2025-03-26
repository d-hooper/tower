<script setup>
import { towerEventsService } from '@/services/TowerEventsService.js';
import EventDetails from '@/components/EventDetails.vue';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

onMounted(()=>{
  getTowerEventById()
})

async function getTowerEventById() {
  try {
    const eventId = route.params.eventId
    await towerEventsService.getTowerEventById(eventId)
  }
  catch (error){
    Pop.error(error, 'Could not retrieve event details');
    logger.error('COULD NOT RETRIEVE EVENT DETAILS', error)
  }
}

</script>


<template>
  <section class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-xl-10">
        <EventDetails/>
      </div>
    </div>
  </section>
</template>


<style lang="scss" scoped></style>