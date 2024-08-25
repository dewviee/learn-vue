<template>
  <div class="register-container">
    <h1>Register</h1>
    <div class="register-form">
      <TextFieldComponent v-model:field="registerInfo.email" label="Email" />
      <TextFieldComponent v-model:field="registerInfo.username" label="Username" />
      <TextFieldComponent v-model:field="registerInfo.password" label="Password" type="password" />
      <TextFieldComponent
        v-model:field="registerInfo.confirmPassword"
        label="Confirm Password"
        type="password"
      />
    </div>

    <div class="register-container">
      Already have account?
      <router-link to="/login">click here to login</router-link>
    </div>

    <button @click="register">Register</button>
  </div>
</template>

<script lang="ts">
import TextFieldComponent from '@/components/TextFieldComponent.vue'
import router from '@/router/router'
import api from '@/services/api'
import { apiPathV1 } from '@/services/apiPath'
import type { TApiError } from '@/types/api.type'
import type { TRegisterForm, TRegisterRequest } from '@/types/auth.type'
import { checkEmptyKey } from '@/utils/filter'
import type { AxiosError } from 'axios'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'RegisterPage',
  components: { TextFieldComponent },
  setup: () => {
    const registerInfo = ref<TRegisterForm>({
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    })

    return { registerInfo }
  },
  methods: {
    async register() {
      const formData: TRegisterForm = this.registerInfo

      const missingFields: string[] = checkEmptyKey(formData)

      if (missingFields.length > 0) {
        alert(`${missingFields.join(', ')} is required`)
        return
      }

      if (formData.password !== formData.confirmPassword) {
        alert('password and confirm password not match!')
        return
      }

      const payload: TRegisterRequest = {
        email: formData.email,
        username: formData.username,
        password: formData.password
      }

      try {
        await api.post(apiPathV1.auth.register, payload)

        router.push('/login')
      } catch (err) {
        const error = err as AxiosError
        const errResponse = error.response?.data as TApiError

        alert(errResponse.message)
      }
    }
  }
})
</script>

<style scoped>
.register-form {
  margin: 10px;
}

.register-container {
  margin: 10px;
}
</style>
