<script setup>
import { AppState } from '@/AppState.js';
import { towerCommentsService } from '@/services/TowerCommentsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed } from 'vue';

// const attending = computed(() => AppState.towerComments.some()) 
// const hosting = computed(() => AppState.towerComments.some()) 

const account = computed(() => AppState.account)
const towerComments = computed(() => AppState.towerComments)

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
  <div v-for="comment in towerComments" :key="comment.id" class="d-flex gap-4 align-items-end justify-content-between mt-3 mb-2 bg-white p-3">
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
      <span class="text-danger bg-light border border-danger rounded-pill px-2">Attending</span>
      <button v-if="comment.creatorId == account?.id" @click="deleteComment(comment.id)" class="btn btn-warning text-light px-1 py-0 mt-3" title="Delete comment">
        Remove
      </button>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.round-img {
  height: 3rem;
}
</style>