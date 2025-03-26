<script setup>

</script>


<template>
<div class="row">
      <div class="col-12">
        <div class="hero-image d-flex align-items-center">
          <div class="text-light hero-text p-3 rounded">
            <h2 class="fs-4">Create and Find Local Events</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi facere, officia reprehenderit inventore
              neque quisquam obcaecati iste quis.</p>
          </div>
        </div>
      </div>
    </div>
</template>


<style lang="scss" scoped>
.hero-image {
  background-image: url('https://images.unsplash.com/photo-1464207687429-7505649dae38?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  background-position: center;
  min-height: 80dvh;
}

.hero-text {
  max-width: 450px;
  margin-left: 5rem;
  margin-bottom: 12.5rem;
  background-color: #1a1919cc;
  backdrop-filter: blur(4px);
}

@media screen and (max-width: 576px) {
  .hero-image {
    align-items: flex-start !important;
    background-position: left;
  }

  .hero-text {
    margin: 1.5rem 0.5rem 0 0.5rem;
  }
}
</style>