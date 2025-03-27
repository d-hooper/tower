<script setup>
import { towerEventsService } from '@/services/TowerEventsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';


const types = ['convention', 'sport', 'concert', 'digital']

const router = useRouter()

const editableEventData = ref({
  name: '',
  location: '',
  type: '',
  capacity: 0,
  coverImg: '',
  description: '',
  startDate: null
})

async function createTowerEvent() {
  try {
    const eventData = editableEventData.value
    const towerEvent = await towerEventsService.createTowerEvent(eventData)
    Modal.getOrCreateInstance('#newEventModal').hide()
    router.push({ name: 'EventDetails', params: { eventId: towerEvent.id } })

  }
  catch (error) {
    Pop.error(error, 'Could not create event');
    logger.error('could not create event'.toUpperCase(), error);
  }
}

</script>


<template>
  <form @submit.prevent="createTowerEvent()">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-6">
          <div v-if="editableEventData.coverImg" class="h-100 border border-1 rounded">
            <img :src="editableEventData.coverImg" :alt="`Picture for ${editableEventData.name}`" class="rounded">
          </div>
          <div v-else class="h-100 border border-1 rounded d-flex align-items-center justify-content-center">
            <span class="fs-2">Image Preview</span>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="form-floating my-3">
            <input v-model="editableEventData.name" type="text" class="form-control" id="towerEventName"
                   placeholder="Name..." minlength="3" maxlength="50" required>
            <label for="towerEventName">Event Name</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="editableEventData.location" type="text" class="form-control" id="towerEventLocation"
                   placeholder="Address or Meet-Up Spot..." maxlength="500" required>
            <label for="towerEventLocation">Event Location</label>
          </div>
          <div class="form-floating mb-3">
            <select v-model="editableEventData.type" class="form-select" aria-label="Event Type" id="eventType"
                    required>
              <option value="" selected disabled>Select an event type</option>
              <option v-for="type in types" :key="'option ' + type" :value="type">{{ type }}
              </option>
            </select>
            <label for="eventType">Event Type</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="editableEventData.capacity" type="number" class="form-control" id="towerEventCapacity"
                   placeholder="Address or Meet-Up Spot..." min="1" max="5000" required>
            <label for="towerEventCapacity">Capacity</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="editableEventData.startDate" type="date" class="form-control" id="towerEventDate"
                   placeholder="Address or Meet-Up Spot..." min="1" max="5000" required>
            <label for="towerEventDate">Date</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="editableEventData.coverImg" type="url" class="form-control" id="eventCoverImg"
                   placeholder="Image URL..." maxlength="500" required>
            <label for="eventCoverImg">Image URL</label>
          </div>
        </div>
        <div class="col-lg-10">
          <div class="form-floating my-3">
            <textarea v-model="editableEventData.description" type="text" class="form-control"
                      id="towerEventDescription" placeholder="Event Details..." minlength="15" maxlength="1000"
                      required>
              </textarea>
            <label for="towerEventDescription">Event Description</label>
          </div>
        </div>
        <div class="col-lg-10">
          <div class="text-end">
            <button class="btn btn-primary text-light">Create Event</button>
          </div>
        </div>
      </div>
    </div>

  </form>
</template>


<style lang="scss" scoped>
textarea {
  min-height: 15dvh !important;
}

img {
  max-width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>