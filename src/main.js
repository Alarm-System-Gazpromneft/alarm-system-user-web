import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router'
import components from './components/ui'
import store from './store'
import PrimeVue from 'primevue/config';
const app=createApp(App)

components.forEach(component=>{
  app.component(component.name,component)
})


app.use(store)
store.commit('login/INIT_AUTH');
store.commit('sheduleMod/INIT_SHEDULE');

app
    .use(PrimeVue)
    .use(router)
    .mount('#app')

