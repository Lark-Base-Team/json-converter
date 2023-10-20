import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './assets/main.css'
import 'virtual:uno.css'
import { JsonViewer } from "vue3-json-viewer";
// import {i18n} from './locales/i18n.js'
// createApp(App).use(i18n).mount('#app') // 注入国际化函数$t


createApp(App)
  .use(createPinia())
  .use(JsonViewer)
  .mount('#app')
