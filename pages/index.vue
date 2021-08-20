<template>
  <div class="h-screen overflow-auto">
    <div class="m-6">
      
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',

  components: {},

  data() {
    return {
      
    }
  },


  layout: 'dashboard',

}
</script>

<style scoped>
.timestamps-card-size {
  height: 200px;
}

@media screen and (min-width: 1024px) {
  .timestamps-card-size {
    height: 328px;
  }
}

@media screen and (min-width: 1440px) {
  .timestamps-card-size {
    height: 511px;
  }
}

@media screen and (min-width: 1688px) {
  .timestamps-card-size {
    height: auto;
  }
}

.embed-container {
  width: 100% !important;
}

.player-height {
}
</style>
