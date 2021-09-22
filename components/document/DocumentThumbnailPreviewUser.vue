<template>
  <div class="flex flex-col justify-center items-center card-size">
    <div class="frame-size bg-gray-600 rounded-lg border">
      <img
        class="rounded-lg w-full h-full"
        src="~/assets/images/pdf.png"
        alt="Trulli"
      />
    </div>
    <div class="text-base font-normal pt-4">
      {{ doc.title }}
    </div>
    <div>
      <div class="w-32">
        <a :href="doc.url" :download="doc.title + '.pdf'" target="_blank">
          <PrimaryButton text="Download" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import PrimaryButton from '@/components/buttons/PrimaryButton'

export default {
  name: 'DocumentThumbnailPreviewUser',

  components: { PrimaryButton },

  props: {
    doc: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
.frame-size {
  height: 180px;
  width: 180px;
}

.card-size {
  width: 200px;
  height: 300px;
}
</style>
