<script setup>

</script>


<template>
    <div class="row d-flex justify-content-center mt-3">
      <div class="col-lg-12 col-xl-10">
        <h2 class="fs-4 fw-bold">How Tower Works</h2>
      </div>
      <div class="col-sm-6 col-lg-4">
        <a href="">
          <div class="d-flex justify-content-between bg-light rounded p-4 mt-3 mb-4" role="button">
            <span class="mdi mdi-magnify text-success fs-3 me-2"></span>
            <div>
              <p class="mb-0 fs-5">Find Interesting Events</p>
              <p class="mb-0 fs-6">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem quis fuga qui.</p>
              <div class="mt-1">
                <span class="text-success">Find an Event</span>
              </div>
            </div>
          </div>
        </a>
      </div>
      <div class="col-sm-6 col-lg-4">
        <div class="d-flex justify-content-between bg-light rounded p-4 mt-3 mb-4" role="button"  data-bs-toggle="modal" data-bs-target="#newEventModal">
          <span class="mdi mdi-plus text-success fs-3 me-2"></span>
          <div>
            <p class="mb-0 fs-5">Plan Your Own Event</p>
            <p class="mb-0 fs-6">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem quis fuga qui.</p>
            <div class="mt-1">
              <span class="text-success">Create an Event</span>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>


<style lang="scss" scoped>
a {
  text-decoration: none;
  color: var(--bs-dark)
}

[role='button']:hover {
  box-shadow: 0px 0px 5px 5px var(--bs-success)
}

</style>