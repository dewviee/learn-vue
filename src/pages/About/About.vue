<template>
  <div>
    <h1>About Us</h1>
    <p>This is the About page.</p>
    <router-link to="/">Back to Home</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AboutPage'
})
</script>

<style scoped>
/* Add styles specific to this component */
h1 {
  color: #3498db;
}
</style>
