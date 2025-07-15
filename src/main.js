import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router'
import components from './components/ui'
import store from './store'
const app=createApp(App)

components.forEach(component=>{
  app.component(component.name,component)
})

store.commit('login/INIT_AUTH');
app 
    .use(store)
    .use(router)
    .mount('#app')

