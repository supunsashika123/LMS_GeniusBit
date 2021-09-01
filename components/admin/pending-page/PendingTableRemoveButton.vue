<template>
  <div
    class="bg-black text-white py-1 cursor-pointer hover:bg-coral-700 font-bold text-xs flex justify-center items-center rounded-lg"
    @click="$emit('click')"
  >
    <div>{{ text }}</div>
    <LoadingSpinner v-if="loading" />
  </div>
</template>

<script>
import LoadingSpinner from '@/components/LoadingSpinner'
export default {
  name: 'PendingTableRemoveButton',

  components: { LoadingSpinner },

  props: {
    loading: {
      type: Boolean,
      required: false,
    },

    text: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped></style>
