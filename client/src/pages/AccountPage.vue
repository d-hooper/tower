<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { Pop } from '@/utils/Pop.js';
import { logger } from '@/utils/Logger.js';
import { ticketsService } from '@/services/TicketsService.js';
import TicketedEventCard from '@/components/TicketedEventCard.vue';

const account = computed(() => AppState.account)
const ticketedEvents = computed(() => AppState.ticketedEvents)


onMounted(() => {
  getMyTicketedEvents()
})

async function getMyTicketedEvents() {
  try {
    await ticketsService.getTicketsByAccountId()
  }
  catch (error){
    Pop.error(error, 'Could not get events');
    logger.error('Could not get events'.toUpperCase(), error);
  }
}

</script>

<template>
  <div class="container text-gray">
    <div class="row justify-content-center">
      <div class="col-10">
        <div v-if="account" class="d-flex gap-2 align-items-center mt-5">
          <img class="rounded-pic" :src="account.picture" alt="" />
          <h2>{{ account.name }}</h2>
        </div>
        <div v-else>
          <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
        </div>
      </div>
      <div class="col-lg-10">
        <div class="mt-5">
          <h3 class="fs-4">Your Created Events</h3>
          <div class="row">
            <div class="col-md-6">
              
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-10">
        <div class="mt-5 mb-3">
          <h3 class="fs-4">Your Reserved Tickets</h3>
        </div>
        <div class="row">
          <div v-for="ticketedEvent in ticketedEvents" :key="ticketedEvent.id" class="col-md-6">
              <TicketedEventCard :ticket="ticketedEvent"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.rounded-pic {
  border-radius: 50%;
}
</style>
