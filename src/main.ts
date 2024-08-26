import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import dayjs from 'dayjs'
import buddhistEra from 'dayjs/plugin/buddhistEra'

const app = createApp(App)
app.use(router)

dayjs.extend(buddhistEra)

app.mount('#app')
