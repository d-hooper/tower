<script setup>
import { AppState } from '@/AppState.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import EventDescription from './EventDescription.vue';
import { ticketsService } from '@/services/TicketsService.js';
import { towerEventsService } from '@/services/TowerEventsService.js';
import CommentForm from './CommentForm.vue';
import { towerCommentsService } from '@/services/TowerCommentsService.js';
import ListedComments from './ListedComments.vue';


const towerEvent = computed(() => AppState.activeTowerEvent)
const account = computed(() => AppState.account)
const attendees = computed(() => AppState.attendees)
const hasTicket = computed(() => attendees.value.some(attendee => attendee.accountId == account.value?.id))
const remainingSpots = computed(() => (towerEvent.value.capacity - towerEvent.value.ticketCount))

const route = useRoute()

onMounted(() => {
  getAttendees()
  getComments()
})

async function getComments() {
  try {
    const eventId = route.params.eventId
    await towerCommentsService.getComments(eventId)
  }
  catch (error) {
    Pop.error(error, `Could not get comments for this event`);
    logger.error(`Could not get comments for event`.toUpperCase(), error);
  }
}
async function getAttendees() {
  try {
    const eventId = route.params.eventId
    await towerEventsService.getTicketsByEventId(eventId)
  }
  catch (error) {
    Pop.error(error, `Could not retrieve ticket data for this event`);
    logger.error(`Could not retrieve ticket data for event`.toUpperCase(), error);
  }
}

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
  <div v-if="towerEvent" :class="`row mt-4  ${towerEvent.isCanceled ? 'justify-content-start' : 'justify-content-center'}`">
    <div class="col-12">
      <div id="cover-bg" class="text-center rounded-5 w-100"
           :style=" `--bg-url: url(${towerEvent.coverImg});`">
        <img :src="towerEvent.coverImg" :alt="`Photo for the ${towerEvent.name}`" class="details-img">
      </div>
    </div>
    <div class="col-lg-8">
      <EventDescription />
      <div class="mt-4">
        <p class="fs-5 fw-bold">Comments</p>
        <div class="bg-light rounded py-2 px-4 mb-4">
          <CommentForm />
          <ListedComments/>
        </div>
      </div>
    </div>
    <div v-if="!towerEvent.isCanceled" class="col-10 col-sm-8 col-lg-4">
      <div class="bg-light text-center mt-4 py-3 px-1 rounded">
        <div v-if="hasTicket">
          <p class="mb-0 text-info">You have reserved a ticket.</p>
        </div>
        <div v-else>
          <p class="fs-5 fw-bold text-gray">Interested in going?</p>
          <p :class="`fs-6 ${remainingSpots == 0 ? ' text-warning' : ' text-gray'}`">{{ `${remainingSpots == 0 ? 'NO MORE TICKETS' : 'Grab a ticket'}`}}</p>
          <button @click="reserveTicket()" type="button" title="Reserve a ticket" class="btn btn-primary text-light"
                  :disabled="!account || towerEvent.isCanceled || remainingSpots == 0">Reserve</button>
        </div>
      </div>
      <p v-if="!towerEvent.isCanceled" class="mb-0 text-end">
        <span :class="`${remainingSpots == 0 ? 'text-warning' : 'text-success'}`">
          {{ remainingSpots }}
        </span>
        {{ `${remainingSpots == 1 ? 'spot' : 'spots'} left` }}
      </p>
      <div class="mt-4">
        <h3 class="fs-5 mb-1">Attendees</h3>
        <div v-if="attendees.length > 0" class="bg-light py-3 px-1 rounded">
          <div v-for="attendee in attendees" :key="attendee.id"
               class="border-start border-3 border-success d-flex align-items-center gap-2 ms-2 mb-2 ps-2">
            <img :src="attendee.profile.picture" :alt="attendee.profile.name" class="round-img">
            <p class="mb-0">{{ attendee.profile.name }}</p>
          </div>
        </div>
        <div v-else class="bg-light py-3 px-1 rounded">
          <div class="d-flex align-items-center justify-content-center">
            <span class="fs-5">No reservations yet!</span>
          </div>
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

// .mdi:hover{
// position: relative;
// ::after{
//   display: inline-block;
//   transition: all .2s ease;
//   opacity: 0;
//   // transform: translate(50% -10px);

// }
// &::after{
//   opacity: 1;
//   background-color: rgba(0, 0, 0, 0.507);
//   color: whitesmoke;
//   border-radius: 10px;
//   padding: .5em;
//   font-size: 14px;
//   backdrop-filter: blur(10px);
//   position: absolute;
//   top: -2em;
//   left: 0;
//   // transform: translate(50% 0px) ;
//   content: attr(after-text);
// }
// }

#cover-bg{
  position: relative;
  overflow: hidden;
  &::before{
    position: absolute;
    top: -10%;
    bottom: -10%;
    right: -10%;
    left: -10%;
    content: '';
    background-image: var(--bg-url);
    filter: blur(20px);
  }
  img{
    position: relative;
  }
}
</style>