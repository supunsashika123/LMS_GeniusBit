<template>
  <Button
    class="button-height w-full px-4 py-1 focus:outline-none font-bold cursor-pointer text-base text-white flex justify-center items-center rounded-lg mt-2"
    @click="$emit('click')"
  >
    <LoadingSpinner v-if="loading" />
    <span v-else class="text-red">{{ text }}</span>
  </Button>
</template>

<script>
import LoadingSpinner from '@/components/LoadingSpinner'

export default {
  name: 'DocumentEditButton',

  components: { LoadingSpinner },

  props: {
    text: {
      type: String,
      required: true,
    },

    loading: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped></style>
