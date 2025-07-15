<template>
    <div>
      <img src="../assets/logo2.png" class="img">
      <!-- <my-button @click="$router.push('/posts')">Посты</my-button> -->
      <login-form v-model="show"></login-form>
    </div>
    <my-loading v-show="this.$store.state.login.loading"></my-loading>
</template>

<script>
import LoginForm from '../components/LoginForm.vue';
export default {
  data(){
    return{
      show: false
    }
  },
  components:{
    LoginForm
  },
  methods:{
    
  },
  // mounted() {
  //   setTimeout(() => {
  //     this.isLoading = false;
  //   }, 1500);
  // },

}
</script>

<style scoped>
.img {
  /* border: 1px solid #ddd;
  border-radius: 4px;
  padding: 15px; */
  width: 300px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>