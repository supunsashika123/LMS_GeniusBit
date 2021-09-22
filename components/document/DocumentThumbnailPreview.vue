<template>
  <div class="flex flex-col justify-center items-center card-size">
    <div class="frame-size bg-gray-600 rounded-lg">
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
        <DocumentEditButton text="Edit" @click="handleEditDocClick(doc.id)" />
      </div>
    </div>
  </div>
</template>

<script>
import PrimaryButton from '@/components/buttons/PrimaryButton'
import DocumentEditButton from '@/components/buttons/DocumentEditButton'

export default {
  name: 'DocumentThumbnailPreview',

  components: { DocumentEditButton, PrimaryButton },

  props: {
    doc: {
      type: Object,
      required: true,
    },
  },

  methods: {
    handleEditDocClick(id) {
      return this.$router.push({
        path: 'upload-document',
        query: { id },
      })
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
