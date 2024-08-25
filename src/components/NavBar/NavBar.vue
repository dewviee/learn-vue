<template>
  <div class="navbar">
    <div class="navbar-left">
      <h1>Just Post</h1>
    </div>
    <div class="navbar-right">
      <ul>
        <li class="logout-button" @click="handleLogout">Logout</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import router from '@/router/router'
import api from '@/services/api'
import { apiPathV1 } from '@/services/apiPath'
import type { TApiError } from '@/types/api.type'
import type { AxiosError } from 'axios'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NavBar',
  setup: () => {},
  methods: {
    async handleLogout() {
      const accessToken = localStorage.getItem('accessToken') as string
      try {
        await api.post(
          apiPathV1.auth.logout,
          {},
          { headers: { Authorization: `Bearer ${accessToken}` } }
        )

        localStorage.removeItem('accessToken')
        router.push('/login')
      } catch (err) {
        const axiosErr = err as AxiosError
        const data = axiosErr.response?.data as TApiError
        alert(data?.message ?? 'cannot logout')
      }
    }
  }
})
</script>

<style scoped>
.logout-button {
  color: white;
  padding: 14px 20px;
  cursor: pointer;
  text-decoration: none;
  background-color: #333;
  border: none;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background-color: #575757;
  border-radius: 4px; /* Optional: adds rounded corners */
}

.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #333;
  padding: 10px 20px;
  z-index: 1000; /* Ensures the navbar is on top of other content */
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box; /* Ensures padding is included in width */
}

.navbar-left h1 {
  margin: 0;
  color: white;
  font-size: 24px;
}

.navbar-right ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.navbar-right li {
  display: inline;
}

.navbar-right li a {
  text-decoration: none;
  color: white;
  padding: 14px 20px;
  display: inline-block;
}

.navbar-right li a:hover {
  background-color: #575757;
}

body {
  padding-top: 60px; /* Ensure content does not hide under the navbar */
  margin: 0;
  font-family: Arial, sans-serif;
}
</style>
