<script setup>
import { AppState } from './AppState.js';
import Navbar from './components/Navbar.vue';
import { RouterView } from 'vue-router';

</script>

<template>
  <header>
    <Navbar />
  </header>
  <main>
    <RouterView/>
  </main>
</template>

<style lang="scss">


</style>
