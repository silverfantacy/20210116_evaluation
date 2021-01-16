import { createApp } from 'vue'
import App from './App.vue'
import installElementPlus from './plugins/element'
import axios from 'axios'
import VueAxios from "vue-axios";

const app = createApp(App)
installElementPlus(app)
// app.mount('#app')
app.use(VueAxios, axios).mount('#app')