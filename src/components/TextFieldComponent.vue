<template>
  <div class="text-field-container">
    <label class="label">{{ label }}</label>
    <input :type="type" :value="field" @input="updateValue" />
  </div>
</template>

<script lang="ts">
import { defineComponent, type InputTypeHTMLAttribute } from 'vue'

export default defineComponent({
  name: 'TextFieldComponent',
  props: {
    label: {
      type: String,
      required: true
    },
    field: {
      type: String,
      default: ''
    },
    type: {
      type: String as () => InputTypeHTMLAttribute,
      default: 'text'
    }
  },
  emits: ['update:field'],
  methods: {
    updateValue(event: Event) {
      const input = event.target as HTMLInputElement
      this.$emit('update:field', input.value)
    }
  }
})
</script>

<style scoped>
.text-field-container {
  display: flex;
  margin: 0 auto; /* Center horizontally */
  flex-direction: column; /* Align children vertically */
  max-width: 400px;
}

.label {
  margin-bottom: 4px; /* Space between the label and the input */
  font-weight: bold; /* Optional: makes the label bold */
  text-align: left;
}

input {
  padding: 8px; /* Adds space inside the input field */
  border: 1px solid #ccc; /* Adds a border to the input field */
  border-radius: 4px; /* Optional: rounds the corners of the input field */
}
</style>
