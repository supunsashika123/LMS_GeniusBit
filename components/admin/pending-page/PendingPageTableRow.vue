<template>
  <div
    class="flex items-center text-base text-gray-800 font-normal mt-2 bg-blue-light py-1 rounded-lg px-2"
  >
    <div class="w-3/12 flex items-center">
      <input
        :checked="checked"
        type="checkbox"
        name="name1"
        class="mr-4"
        @change="$emit('check-change', $event.target.checked)"
      />
      {{ name }}
    </div>
    <div class="w-2/12 flex items-center">{{ userName }}</div>
    <div class="w-4/12 flex items-center">{{ email }}</div>
    <div class="w-1/12 flex items-center">{{ status }}</div>
    <div class="w-2/12 flex justify-center">
      <div class="flex flex-col py-2 lg:flex-row m-auto">
        <div class="w-20">
          <PendingTableAddButton
            :text="firstButtonText"
            @click="$emit('view-button-click')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PendingTableAddButton from '@/components/admin/pending-page/PendingTableAddButton'

export default {
  name: 'PendingPageTableRow',

  components: { PendingTableAddButton },

  props: {
    checked: {
      type: Boolean,
      required: true,
      default: false,
    },

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
    status: {
      type: String,
      required: true,
    },
    firstButtonText: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped></style>
