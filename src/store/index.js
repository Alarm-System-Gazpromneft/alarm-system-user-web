import loginModule from './loginModule.js'
import { createStore } from 'vuex';
import sheduleModule from './sheduleModule.js'

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
    login: loginModule,
    sheduleMod: sheduleModule
  }
})
//store.commit('login/INIT_AUTH');