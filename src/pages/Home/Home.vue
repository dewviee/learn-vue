<template>
  <div>
    <h1>Welcome to My Vue 3 App!</h1>
    <p>This is your first page.</p>
    <router-link to="/about">Go to About Page</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomePage'
})
</script>

<style scoped>
/* Add styles specific to this component */
h1 {
  color: #42b983;
}
</style>
