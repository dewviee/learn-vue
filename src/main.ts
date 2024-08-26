import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import dayjs from 'dayjs'
import buddhistEra from 'dayjs/plugin/buddhistEra'

createApp(App).use(router).mount('#app')
dayjs.extend(buddhistEra)
