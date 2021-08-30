<template>
  <div
    class="flex items-center text-base text-gray-800 font-normal mt-2 bg-gray-400 py-1 rounded-lg px-2"
  >
    <div class="w-3/12 flex items-center">{{ name }}</div>
    <div class="w-2/12 flex items-center">{{ userName }}</div>
    <div class="w-5/12 flex items-center">{{ email }}</div>
    <div class="w-2/12">
      <div class="flex flex-col py-2 lg:flex-row">
        <div class="w-20">
          <StudentsTableAddButton text="Edit" />
        </div>
        <div class="w-20 lg:w-24 mt-2 lg:mt-0 lg:ml-4">
          <StudentsTableRemoveButton text="Remove" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StudentsTableAddButton from '@/components/admin/students/StudentsTableAddButton'
import StudentsTableRemoveButton from '@/components/admin/students/StudentsTableRemoveButton'

export default {
  name: 'StudentsPageTableRow',

  components: {
    StudentsTableRemoveButton,
    StudentsTableAddButton,
  },

  props: {
    name: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped></style>
