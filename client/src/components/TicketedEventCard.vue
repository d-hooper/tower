<script setup>
import { TicketedEvent } from '@/models/Ticket.js';
import { ticketsService } from '@/services/TicketsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';

defineProps({
  ticket: { type: TicketedEvent, required: true }
})

async function deleteTicket(ticketId) {
  try {
    const confirmed = await Pop.confirm('Are you sure you want to delete your ticket?', "Selecting 'Yes' will remove you from the attendees list and put your ticket back into circulation.", 'Yes', 'No')
    if (!confirmed) {
      return
    }
    await ticketsService.deleteTicket(ticketId)
  }
  catch (error) {
    Pop.error(error, 'Could not delete specified ticket');
    logger.error('Could not delete specified ticket'.toUpperCase(), error);
  }
}
</script>


<template>
  <RouterLink :to="{ name: 'EventDetails', params: { eventId: ticket.towerEvent.id } }">
    <div class="rounded-top bg-light border-top border-start border-end border-primary p-2 mb-0 d-flex align-items-center">
      <div class="ticket-img me-4">
        <img :src="ticket.towerEvent.coverImg" alt="" class="event-img rounded">
      </div>
      <div class="d-flex flex-column justify-content-evenly">
        <p class="mb-0 text-gray fs-5">{{ ticket.towerEvent.startDate.toDateString() }}</p>
        <p class="mb-0 text-dark fw-bold">{{ ticket.towerEvent.name }}</p>
        <small class="text-gray">{{ ticket.towerEvent.startDate.toLocaleString() }}</small>
      </div>
    </div>
  </RouterLink>
  <div class="bg-light rounded-bottom border border-primary text-end mb-3 p-2">
    <button @click="deleteTicket(ticket.id)" class="btn btn-outline-primary fs-6 py-0 px-1 rounded-2" type="button"
            :title="'Cancel your reserved ticket for ' + ticket.towerEvent.name">Unattend</button>
  </div>
</template>


<style lang="scss" scoped>
.ticket-img {
  max-width: 50%
}

.event-img {
  width: 100%;
  min-height: 25dvh;
  object-fit: cover;
}
</style>