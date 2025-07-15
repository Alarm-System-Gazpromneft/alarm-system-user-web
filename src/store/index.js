import loginModule from './loginModule.js'
import { createStore } from 'vuex';


export default createStore({
  state: () => ({         //$store.state. ...
  }),
  getters:{       //$store.getters. ...  функция с return

  },
  mutations:{         //принимают параметром state и изменяют его параметры     $store.commit('NameMutation')
  },
  actions:{         //

  },
  modules:{
    login: loginModule
  }
})
//store.commit('login/INIT_AUTH');