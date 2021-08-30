<template>
  <div
    class="bg-red text-white py-1 cursor-pointer hover:bg-coral-700 font-bold text-xs flex justify-center items-center rounded-lg"
  >
    <div>{{ text }}</div>
  </div>
</template>

<script>
export default {
  name: 'StudentsTableRemoveButton',

  props: {
    text: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped></style>
