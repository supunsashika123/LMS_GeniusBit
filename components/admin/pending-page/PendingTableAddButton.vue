<template>
  <div
    class="bg-green-800 text-white py-1 cursor-pointer hover:bg-green-900 font-bold text-xs flex justify-center items-center rounded-lg"
    @click="$emit('click')"
  >
    <div>{{ text }}</div>
  </div>
</template>

<script>
export default {
  name: 'PendingTableAddButton',

  props: {
    text: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped></style>
