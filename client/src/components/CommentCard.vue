<script setup>
import { TowerComment } from '@/models/TowerComment.js';
import { Pop } from '@/utils/Pop.js';
import { computed } from 'vue';
import { towerCommentsService } from '@/services/TowerCommentsService.js';
import { AppState } from '@/AppState.js';
import { logger } from '@/utils/Logger.js';

const towerEvent = computed(()=> AppState.activeTowerEvent)
const towerComments = computed(() => AppState.towerComments)
const account = computed(() => AppState.account)


defineProps({
  comment: {type: TowerComment, required: true }
})

const hosting = computed(() => towerComments.value.some(commenter => commenter.creatorId == towerEvent.value.creatorId))



async function deleteComment(commentId) {
  try {
    const confirmed = await Pop.confirm('Are you sure you want to delete this comment?', 'This cannot be undone.', 'Yes', 'Cancel')
    
    if (!confirmed) {
      return
    }

    await towerCommentsService.deleteComment(commentId)
  }
  catch (error){
    Pop.error(error, 'Could not deleteComment');
    logger.error('Could not deleteComment', error);
  }
}


</script>

<template>
  <div class="d-flex gap-4 align-items-start">
      <div>
        <img :src="comment.creator.picture" :alt="'A picture of' + comment.creator.name" class="round-img">
      </div>
      <div>
        <p class="mb-0 text-gray fw-bold">{{ comment.creator.name }}</p>
        <p class="mb-0 fs-5">{{ comment.body }}</p>
      </div>
    </div>
    <div class="d-flex flex-column h-100 justify-content-between  align-items-end text-end">
      <span v-if="hosting" :class="`${hosting ? 'text-green border-success bg-success bg-opacity-25 border  ' : 'text-danger border-danger bg-light border '}  rounded-pill px-2`">{{`${hosting ? 'Hosting' : ''}`}}</span>
      <button v-if="comment.creatorId == account?.id" @click="deleteComment(comment.id)" class="btn btn-warning text-light px-1 py-0 mt-3" title="Delete comment">
        Remove
      </button>
    </div>
</template>

<style lang="scss" scoped>

</style>