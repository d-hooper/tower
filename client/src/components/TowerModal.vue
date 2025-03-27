<script setup>
import EventForm from './EventForm.vue';


defineProps({
  showFooter: { type: Boolean, default: false },
  modalTitle: { type: String, required: true },
  modalId: { type: String, required: true },
})
</script>


<template>
  <div class="modal fade" :id="modalId" tabindex="-1" :aria-labelledby="modalId + 'Label'" aria-hidden="true">
    <div :class="'modal-dialog' + (modalId == 'newEventModal' ? ' modal-xl' : '')">
      <div class="modal-content">
        <div class="modal-header">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-10">
                <h1 class="modal-title fs-5" :id="modalId + 'Label'">{{modalTitle}}</h1>
              </div>
            </div>
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div v-if="showFooter" class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>

</style>