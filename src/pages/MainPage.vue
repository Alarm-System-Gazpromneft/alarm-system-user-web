<template>
  <div v-show="(!this.$store.state.login.loading)">
    <div v-show="(this.$store.state.login.id===null&&this.$store.state.login.uuid==null)">
      <img src="../assets/logo2.png" class="mycenter" style="width: 300px;">
      <my-button class='mycenter' style="margin-top: 20px;background-color: rgba(255, 255, 255, 0.521);border-radius: 8px; z-index: 1000; height: 40px;" @click="$router.push('/login')">Авторизация</my-button>
    </div>

    <div v-show="(this.$store.state.login.id!==null&&this.$store.state.login.uuid!==null&& !this.$store.state.login.loading)">
       <div class="container" style="padding-bottom: 15px;">
        <my-button @click="personalAccount" style="display: inline-flex; align-items: center;background-color: white;border-radius: 8px;">
          <img src="../assets/lk3.png" style="height: 35px;">
          <div style="font-size: 15px; border-radius: 8px;">Личный кабинет</div>
        </my-button>
        <div class="name" style="color:rgb(22, 7, 110)">{{ `${this.$store.state.login.name} ${this.$store.state.login.patronymic} ${this.$store.state.login.surname} ` }}</div>
        <my-button @click="logOut" style="display: inline-flex; align-items: center; margin-left: auto;background-color: rgb(37, 99, 235);border-radius: 8px;">
          <img src="../assets/exit.png" style="height: 35px; margin-right: 7px;">
          <div style="font-size: 15px; color:white">Выход</div>
        </my-button>
      </div>
      <div style="margin-bottom: 40px;">
        <my-select style="border: None; color: rgb(22, 7, 110);background-color: white;border-radius: 8px; height: 40px; width: 300px; padding-left: 10px;" v-model="selectedSort" :options="sortOptions" :string="string1" v-show="posts.length>0"></my-select>
        <my-input style='color:rgb(22, 7, 110);background-color: white;border-radius: 8px; margin-left: 15px; height: 35px; width: 300px; padding-left: 10px; border:None;' v-focus v-model="searchQuery" placeholder="Поиск..." v-show="posts.length>0">
		    </my-input>
        <my-button @click="fetchPosts" style='background-color: white;border-radius: 8px; right: 20px; z-index: 1000; height: 40px; margin-left: 15px; margin-top: 4px;'>Обновить список</my-button>
      </div>
        <post-list :posts= "sortedAndSearchedPosts" :isLoading="isPostLoading"></post-list>
    </div>
  </div>
  <my-loading v-show="(this.$store.state.login.loading)"></my-loading>
</template>

<script>
import axios from 'axios'
export default {
  data() { 
      return {
        posts:[],
        dialogVisible:false,
        selectedSort: '',
        searchQuery: '',
        sortOptions:[{value:'name',name: 'По названию'},{value:'id',name:'По id'},{value:'priority',name:'По приоритету'}],
        string1: 'Выберите параметр сортировки',
        updateInterval: null
    }},
    methods:{
      showDialog(){
					this.dialogVisible=true;
			},
      logOut(){
        this.$store.commit('login/CLEAR_AUTH')
        this.$store.commit('sheduleMod/CLEAR_SHEDULE')
      },
      personalAccount(){
        this.$router.push('/account')
      },
      async fetchPosts(){
				try {
					this.isPostLoading=true;
					const response = await axios.get(`http://127.0.0.1:8000/api/employees/get_alarms/${this.$store.state.login.id}`,{params: {
            uuid: this.$store.state.login.uuid
					}});
					this.posts=response.data;
          console.log(response)
				} catch(e){
					alert('Ошибка')
				} finally {
					this.isPostLoading=false;
				}
			},
    },
    async beforeCreate(){
      if (this.$store.state.login.uuid!==null && this.$store.state.login.id!==null){
      //this.$store.state.login.loading=true;
      const response = await axios.get(`http://127.0.0.1:8000/api/employees`,{params: {uuid: this.$store.state.login.uuid, input: this.$store.state.login.id, type: 'id'}})
      if (response.data.error==='Unauthorized'){
        alert('Срок сессии истек, повторите вход')
        this.$router.push('/login')}
      else{
        this.$store.commit('login/SET_NAME',response.data.name)
        this.$store.commit('login/SET_SURNAME',response.data.surname)
        this.$store.commit('login/SET_PATRONYMIC',response.data.patronymic)
        this.$store.commit('login/SET_PIN_CODE',response.data.pin_code)
        console.log(this.$store.state.login.name)
      }
      console.log(response)
      this.$store.state.login.loading=false;
    }
    },
    computed:{
      sortedPosts(){
        if (!this.selectedSort) return this.posts;
    
    return [...this.posts].sort((a, b) => {
      const valA = a[this.selectedSort];
      const valB = b[this.selectedSort];
      
      // Для строк
      if (typeof valA === 'string' && typeof valB === 'string') {
        return valA.localeCompare(valB);
      }
      // Для чисел
      if (typeof valA === 'number' && typeof valB === 'number') {
        return valB- valA;
      }
      
      return 0;
    });
			},
      sortedAndSearchedPosts(){
				return this.sortedPosts.filter(post => (post.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || post.id==this.searchQuery  || (post.description.toLowerCase().includes(this.searchQuery.toLowerCase()))))
			},
    },
    async beforeMount(){
      if (this.$store.state.login.uuid!==null && this.$store.state.login.id!==null){
			  await this.fetchPosts();
      }
    },
    mounted() {
      this.updateInterval = setInterval(() => {
      this.fetchPosts();
    }, 300000);
    }

}
</script>

<style scoped>
.container {
  display: flex;          /* Включаем flex-распределение */
  align-items: center;    /* Выравниваем по вертикали */
  gap: 0px;             /* Расстояние между блоками */
  color: rgba(54, 133, 244, 0.577);
}
.name{
  display:inline;
  padding:20px;
  font-size: 18px;
}
</style>