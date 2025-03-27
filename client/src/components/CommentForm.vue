<script setup>
import { towerCommentsService } from '@/services/TowerCommentsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { ref } from 'vue';
import { useRoute } from 'vue-router';


const editableCommentData = ref({
  body: ''
})
const route = useRoute()

async function postComment() {
  try {
    const towerCommentData = {
      body: editableCommentData.value,
      eventId: route.params.eventId
    }
    await towerCommentsService.postComment(towerCommentData)
  }
  catch (error) {
    Pop.error(error, 'Could not add comment');
    logger.error('Could not add comment'.toUpperCase(), error);
  }
}
</script>


<template>
  <form action="">
    <div class="form-floating my-3">
      <textarea v-model="editableCommentData.body" type="text" class="form-control" id="towerEventDescription"
                placeholder="Event Details..." minlength="15" maxlength="1000" required>
              </textarea>
      <label for="towerEventDescription">Add to the conversation...</label>
    </div>
    <div class="text-end">
      <button @click="postComment()" class="btn btn-success text-light">Post Comment</button>
    </div>
  </form>
</template>


<style lang="scss" scoped>
textarea {
  min-height: 13dvh !important;
}
</style>