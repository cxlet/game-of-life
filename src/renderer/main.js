import { createApp } from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

const app = createApp(App)

if (!process.env.IS_WEB) {
  app.use(require('vue-electron'))
}

app.config.globalProperties.$http = axios
app.config.productionTip = false

app.use(router)
app.use(store)

app.mount('#app')
