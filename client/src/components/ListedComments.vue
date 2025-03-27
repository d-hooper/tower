<script setup>
import { AppState } from '@/AppState.js';
import { computed } from 'vue';


const towerComments = computed(() => AppState.towerComments)
</script>


<template>
{{ towerComments }}
</template>


<style lang="scss" scoped>

</style>