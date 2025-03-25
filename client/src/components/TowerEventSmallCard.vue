<script setup>
import { TowerEvent } from '@/models/TowerEvent.js';

defineProps({
  towerEvent: { type: TowerEvent, required: true}
  }
)
</script>


<template>
<div>
  {{towerEvent}}
</div>
</template>


<style lang="scss" scoped>

</style>