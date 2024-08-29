import axios from 'axios'
import { errorInterceptor } from './errorInterceptor'

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_HOST_NAME}/api`,
  withCredentials: true
})

api.interceptors.response.use((response) => response, errorInterceptor)

export default api
