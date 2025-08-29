import { createApp } from 'vue'
// Ensure some Node-ish globals for third-party browser builds
if (typeof window !== 'undefined' && typeof window.global === 'undefined') {
  window.global = window
}
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

const app = createApp(App)

app.config.globalProperties.$http = axios
app.config.productionTip = false

app.use(router)
app.use(store)

app.mount('#app')
