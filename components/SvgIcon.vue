<template>
  <svg :class="{ [`icon-${name}`]: name }" class="icon" @click="$emit('click')">
    <use :xlink:href="`#${name}`" />
  </svg>
</template>
<script>
const files = require.context(
  '!svg-sprite-loader!./../assets/icons',
  false,
  /.*\.svg$/
)
files.keys().forEach(files)
export default {
  name: 'SvgIcon',

  props: {
    name: {
      type: String,
      required: true,
    },
  },
}
</script>
<style scoped>
.icon {
  display: inline-block;
  stroke-width: 0;
}
</style>
