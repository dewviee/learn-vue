<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

<style>
/* Global styles */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #ffffff;
  margin-top: 60px;
}

body {
  background-color: #323232;
}

a {
  color: cornflowerblue;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

button {
  background-color: #444444;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #555555;
}

input,
textarea {
  background-color: #444444;
  color: #ffffff;
  border: 1px solid #666666;
  padding: 10px;
  border-radius: 5px;
}
</style>
