<template>
  <Button
    class="button-height w-full px-4 focus:outline-none font-bold cursor-pointer text-base text-white flex justify-center items-center rounded-lg mt-2"
    :disabled="buttonStatus"
    :class="dynamicInputStyling"
    @click="$emit('click')"
  >
    <LoadingSpinner v-if="loading" />
    <span v-else>{{ text }}</span>
  </Button>
</template>

<script>
import LoadingSpinner from '@/components/LoadingSpinner'
export default {
  name: 'PrimaryButton',

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

    buttonStatus: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    dynamicInputStyling() {
      if (this.buttonStatus) {
        return ['bg-gray-400', 'border-opacity-75', 'text-gray-800']
      }

      return ['bg-red', 'focus:border-purple-800 hover:bg-green-700']
    },
  },
}
</script>

<style scoped>
.button-height {
  height: 40px;
}
</style>
