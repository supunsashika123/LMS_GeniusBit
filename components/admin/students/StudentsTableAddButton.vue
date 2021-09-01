<template>
  <div
    class="bg-green-800 text-white py-1 cursor-pointer hover:bg-green-900 font-bold text-xs flex justify-center items-center rounded-lg"
  >
    <div>{{ text }}</div>
  </div>
</template>

<script>
export default {
  name: 'StudentsTableAddButton',

  props: {
    text: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped></style>
