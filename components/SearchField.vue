<template>
  <div>
    <div
      class="border height flex border-gray-800 rounded-lg overflow-hidden w-full"
    >
      <button class="focus:outline-none px-3" @click="show = true">
        <SvgIcon name="search" class="w-5 h-5 bg-transparent icon-color" />
      </button>
      <input
        v-debounce:500ms="handleTextChange"
        type="text"
        class="duration-200 text-black text-sm border-none w-full bg-transparent outline-none"
        placeholder="Search"
      />
    </div>
  </div>
</template>

<script>
import SvgIcon from '@/components/SvgIcon'

export default {
  name: 'SearchField',

  components: { SvgIcon },

  methods: {
    handleTextChange(val) {
      this.$emit('text-change', val)
    },
  },
}
</script>

<style scoped>
.height {
  height: 40px;
}

.icon-color {
  stroke: theme('colors.purple.800');
  fill: theme('colors.transparent');
}
</style>
