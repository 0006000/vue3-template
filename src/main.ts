import { createApp } from 'vue'
import App from './App.vue'
import pinia from '@/store/index.ts'
import router from '@/router/index.ts'
import i18n from '@/lang/index.ts'
import '@/styles/index.ts'
import '@/styles/index.scss'
import 'virtual:svg-icons-register'

const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(i18n)
app.mount('#app')
