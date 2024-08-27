import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import { key, store } from './stores/store'
import dayjs from 'dayjs'
import buddhistEra from 'dayjs/plugin/buddhistEra'

const app = createApp(App)
app.use(router)
app.use(store, key)

dayjs.extend(buddhistEra)

app.mount('#app')
