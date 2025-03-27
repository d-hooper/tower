<script setup>
import { towerCommentsService } from '@/services/TowerCommentsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const editableCommentData = ref({
  body: '',
  eventId: route.params.eventId
})

async function postComment() {
  try {
    const towerCommentData = editableCommentData.value

    await towerCommentsService.postComment(towerCommentData)
    editableCommentData.value.body = ''
  }
  catch (error) {
    Pop.error(error, 'Could not add comment');
    logger.error('Could not add comment'.toUpperCase(), error);
  }
}
</script>


<template>
  <form @submit.prevent="postComment">
    <div class="form-floating my-3">
      <textarea v-model="editableCommentData.body" type="text" class="form-control" id="towerEventDescription"
                placeholder="Event Details..." minlength="15" maxlength="1000" required>
              </textarea>
      <label for="towerEventDescription">Add to the conversation...</label>
    </div>
    <div class="text-end">
      <button class="btn btn-success text-light" type="submit" title="Post Comment">Post Comment</button>
    </div>
  </form>
</template>


<style lang="scss" scoped>
textarea {
  min-height: 13dvh !important;
}
</style>