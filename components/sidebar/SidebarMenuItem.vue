<template>
  <div
    :class="isActive ? 'border-2 border-black ' : ''"
    class="rounded-lg w-full h-10 flex start items-center cursor-pointer"
  >
    <NuxtLink :to="routeName">
      <div class="flex items-center">
        <div class="pl-3 pr-2 md:pl-6">
          <SvgIcon
            :name="iconName"
            class="hover-effect w-6 h-6 icon-color"
            :class="isActive ? 'active-svg' : ''"
          />
        </div>
        <div class="text-gray-800 text-lg font-medium">
          <span
            class="hover-effect text-xs"
            :class="isActive ? ' text-black ' : ''"
            >{{ name }}
          </span>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script>
import SvgIcon from "~/components/SvgIcon";
export default {
  name: "SidebarMenuItem",
  components: { SvgIcon },
  props: {
    routeName: {
      type: String,
      required: true,
      default: "",
    },
    name: {
      type: String,
      required: true,
    },
    iconName: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.button-hover {
  transition: 0.3s;
}

.icon-color {
  fill: theme("colors.gray.800");
  stroke: theme("colors.gray.700");
}
.active-svg {
  fill: theme("colors.black");
  color: theme("colors.black");
  stroke: theme("colors.black");
}
.wrapper:hover .hover-effect {
  fill: theme("colors.purple.800");
  color: theme("colors.purple.800");
  stroke: theme("colors.purple.800");
}
</style>
