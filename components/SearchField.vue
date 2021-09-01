<template>
  <div>
    <div
      class="
        border
        height
        flex
        border-gray-800
        bg-white
        rounded-lg
        overflow-hidden
        w-full
      "
    >
      <button class="focus:outline-none px-3" @click="show = true">
        <SvgIcon name="search" class="w-5 h-5 icon-color" />
      </button>
      <input
        @input="handleTextChange"
        type="text"
        class="duration-200 text-black text-sm border-none w-full outline-none"
        placeholder="Search"
      />
    </div>
  </div>
</template>

<script>
import SvgIcon from "@/components/SvgIcon";

export default {
  name: "SearchField",

  components: { SvgIcon },

  methods: {
    handleTextChange(val) {
      this.$emit("text-change", val);
    },
  },
};
</script>

<style scoped>
::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #707070;
  opacity: 1; /* Firefox */
}

.height {
  height: 40px;
}

.icon-color {
  stroke: theme("colors.purple.800");
  fill: theme("colors.transparent");
}
</style>
