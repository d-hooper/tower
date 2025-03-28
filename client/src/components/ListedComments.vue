<script setup>
import { AppState } from '@/AppState.js';
import CommentCard from './CommentCard.vue';

import { computed } from 'vue';

const towerComments = computed(() => AppState.towerComments)
const attendees = computed(() => AppState.attendees)
// const attending = computed(() => AppState.)

</script>


<template>
  <div v-for="comment in towerComments" :key="comment.id" class="d-flex gap-4 align-items-end justify-content-between mt-3 mb-2 bg-white p-3">
    <CommentCard :comment="comment"/>
  </div>
</template>


<style lang="scss" scoped>
.round-img {
  height: 3rem;
}
</style>