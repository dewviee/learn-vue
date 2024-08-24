<template>
  <div>
    <div class="login-container">
      <h1>Login</h1>
      <div class="login-form">
        <TextFieldComponent v-model:field="username" label="Username" />
        <TextFieldComponent v-model:field="password" label="Password" type="password" />
      </div>
      <div>
        Not have account?
        <router-link to="/register" class="register-link">click here to register</router-link>
      </div>

      <button @click="fetchLogin">Login</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import api from '@/services/api'
import type { AxiosError } from 'axios'
import { apiPathV1 } from '@/services/apiPath'
import type { TLoginRequest, TLoginResponse } from '@/types/auth.type'
import type { TApiError } from '@/types/api.type'
import TextFieldComponent from '@/components/TextFieldComponent.vue'
import router from '@/router/router'
import type { TGetUserProfileResponse, TUserProfile } from '@/types/user.type'

export default defineComponent({
  name: 'LoginPage',
  components: { TextFieldComponent },
  setup() {
    const username = ref('')
    const password = ref('')

    return { username, password }
  },
  methods: {
    async fetchLogin() {
      const payload: TLoginRequest = {
        identifier: this.username,
        password: this.password
      }

      try {
        const result = await api.post(apiPathV1.auth.login, payload)

        const data = result.data as TLoginResponse

        await this.fetchUserData(data.accessToken)
        localStorage.setItem('accessToken', data.accessToken)
        router.push('/')
      } catch (err) {
        const error = err as AxiosError
        const response = error.response?.data as TApiError

        alert(response.message)
      }
    },
    async fetchUserData(accessToken: string) {
      try {
        const result = await api.get(apiPathV1.user.getUserProfile, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          withCredentials: true
        })

        const data = result?.data?.data as TGetUserProfileResponse
        const user: TUserProfile = {
          id: data.id,
          username: data.username,
          email: data.email,
          createdAt: new Date(data.createdAt),
          updatedAt: new Date(data.updatedAt)
        }

        // TODO: Implement service to store
      } catch (err) {
        const error = err as AxiosError
        console.log(error?.response)
        throw err
      }
    }
  }
})
</script>

<style scoped>
.login-container {
  margin-bottom: 5px;
}

.login-form {
  max-width: 300px;
  margin: 0 auto;
}
</style>
