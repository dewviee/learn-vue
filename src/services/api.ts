import axios from 'axios'

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_HOST_NAME}/api`,
  withCredentials: true
})

export default api
