<template>
  <div
    :class="[dynamicButtonStyling]"
    class="button-height w-full bg-white border-2 border-red text-red font-bold text-base flex justify-center items-center cursor-pointer rounded-lg mt-2"
    @click="$emit('click')"
  >
    {{ text }}
  </div>
</template>

<script>
export default {
  name: 'SecondaryButton',

  props: {
    text: {
      type: String,
      required: true,
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      disabledClasses: ['text-gray-600'],
    }
  },

  computed: {
    dynamicButtonStyling() {
      if (this.disabled) return this.disabledClasses
      return null
    },
  },
}
</script>

<style scoped>
.button-height {
  height: 40px;
}
</style>
