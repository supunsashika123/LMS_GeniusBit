<template>
  <ValidationProvider
    v-slot="{ errors }"
    tag="div"
    :name="name"
    :vid="vid"
    :rules="rules"
  >
    <label :for="id" class="block text-2xs font-normal text-black text-left">
      {{ label }}
    </label>
    <div class="mt-1 relative rounded-md">
      <input
        :id="id"
        v-model="localValue"
        :readonly="disabled"
        type="password"
        :class="dynamicInputStyling"
        class="appearance-none block h-10 w-full px-2 border border-gray-800 rounded-lg placeholder-gray-400 focus:outline-none focus:outline-blue transition duration-150 ease-in-out text-sm sm:leading-5 font-medium"
      />
    </div>
    <div v-if="errors.length" class="text-coral-600 font-normal text-xs">
      {{ errors[0] }}
    </div>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {
  name: 'PasswordField',

  components: { ValidationProvider },

  props: {
    label: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      default: null,
    },
    vid: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: [String, Object],
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      showPassword: false,
      localValue: this.value,
    }
  },

  computed: {
    dynamicInputStyling() {
      if (this.disabled) {
        return ['border-gray-800', 'border-opacity-75', 'text-gray-800']
      }

      return ['border-gray-300', 'focus:border-purple-800']
    },
  },

  watch: {
    value(newText) {
      this.localValue = newText
    },

    localValue(newText) {
      this.$emit('input', newText)
    },
  },
}
</script>

<style>
.icon-color {
  fill: theme('colors.gray.600');
}
</style>
