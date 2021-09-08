<template>
  <div
    class="flex flex-col justify-center items-center card-size cursor-pointer"
    @click="$emit('click')"
  >
    <div class="text-md font-bold pb-2">
      {{ title }}
    </div>
    <div class="bg-gray-600 border rounded-lg">
      <img
        class="rounded-lg"
        :src="thumbnail"
        alt=""
        width="500"
        height="333"
      />
    </div>
    <!--    <div class="text-base font-normal mt-4">-->
    <!--      {{ description }}-->
    <!--    </div>-->
  </div>
</template>

<script>
export default {
  name: 'VideoThumbnailPreview',

  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped>
.description-size {
  height: 50px;
}

.frame-size {
  height: 180px;
  width: 300px;
}

.card-size {
  width: 300px;
}
</style>
