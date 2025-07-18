import axios from 'axios';

export default {
  namespaced: true,
  state: () => ({
    id: null,
    uuid: null,
    loading: false,
    pin_code: null,
    error: null,
    isAuth: false,
    name: '',
    surname:'',
    patronymic: ''
  }),
  mutations: {
    SET_PIN_CODE(state,pin_code){
      state.pin_code=pin_code
      localStorage.setItem('pin_code',pin_code)
    },
    SET_NAME(state,name){
      state.name=name
      localStorage.setItem('name',name)
    },
    SET_SURNAME(state,surname){
      state.surname=surname
      localStorage.setItem('surname',surname)
    },
    SET_PATRONYMIC(state,patronymic){
      state.patronymic=patronymic
      localStorage.setItem('patronymic',patronymic)
    },
    SET_ID(state,id){
      state.id=id
      localStorage.setItem('id', JSON.stringify(id));
    }, 
    SET_UUID(state, uuid) {
      state.uuid = uuid;
      localStorage.setItem('uuid', uuid);
    },
    SET_LOADING(state, isLoading) {
      state.loading = isLoading;
    },
    SET_ISAUTH(state,isAuth){
      state.isAuth=isAuth;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },

    CLEAR_AUTH(state) {
      state.id = null;
      state.uuid = null;
      state.name='';
      state.surname='';
      state.patronymic='';
      localStorage.removeItem('name');
      localStorage.removeItem('surname');
      localStorage.removeItem('patronymic');
      localStorage.removeItem('id');
      localStorage.removeItem('uuid');
      localStorage.removeItem('pin_code')
    },
    INIT_AUTH(state) {
      // Инициализация из storage при загрузке приложения
      const id = localStorage.getItem('id');
      const uuid = localStorage.getItem('uuid');
      const name=localStorage.getItem('name');
      const surname=localStorage.getItem('surname');
      const patronymic=localStorage.getItem('patronymic');
      const pin_code=localStorage.getItem('pin_code')
      state.name=name;
      state.surname=surname;
      state.patronymic=patronymic;
      state.pin_code=pin_code;
      if (uuid) {
        state.uuid = uuid;
      }
      if (id && id !== 'undefined') { 
    try {
      state.id = JSON.parse(id);
    } catch (e) {
      console.error('Ошибка парсинга id:', e);
      state.id = null;
      localStorage.removeItem('id');
    }
  }
    }
  },
  actions: {
    async login({ commit }, user) {
      try {
        commit('SET_LOADING', true);
        commit('SET_ERROR', null);
        let response = await axios.post('http://127.0.0.1:8000/api/employees/authorize', {
          login: user.login,
          password: user.password
        });
        //await new Promise(resolve => setTimeout(resolve, 4000));
        console.log(response);  ////////////
        if (JSON.stringify(response.data) === JSON.stringify({"error": "Incorrect username or password"})) {
          commit('SET_LOADING', false);
          await new Promise(resolve => setTimeout(resolve, 400));
          alert('Ошибка входа, проверьте правильность логина и пароля')
          localStorage.removeItem('uuid')
          localStorage.removeItem('id')
          
        }
        else {
          commit('SET_UUID', response.data.uuid);
          commit('SET_ID', response.data.user);
        }
        return response.data;
      } catch (error) {
        commit('SET_ERROR', error.response?.data?.message || 'Ошибка авторизации');
        throw error;
      } finally {
        //commit('SET_LOADING', false);
      }
    },
    
    async logout({ commit }) {
      commit('CLEAR_AUTH');
    },
    
  },
  getters: {
    isAuthenticated: state => !!state.uuid,
    currentUser: state => state.user,
    isLoading: state => state.loading,
    error: state => state.error
  }
};