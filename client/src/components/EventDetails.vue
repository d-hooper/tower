<script setup>
import { AppState } from '@/AppState.js';
import { computed } from 'vue';

const towerEvent = computed(()=> AppState.activeTowerEvent)
</script>


<template>
{{ towerEvent }}
</template>


<style lang="scss" scoped>

</style>