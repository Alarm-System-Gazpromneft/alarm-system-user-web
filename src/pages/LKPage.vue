<template>
    <div>
      <div v-show="(this.$store.state.login.id==null&&this.$store.state.login.uuid==null)">
        <img src="../assets/logo2.png" class="mycenter" style="width: 300px;margin-top: 10px">
        <my-button class='mycenter' style="margin-top: 20px;background-color: rgba(255, 255, 255, 0.521); border-radius: 4px;" @click="$router.push('/login')">Авторизация</my-button>
      </div>

      <div v-show="(this.$store.state.login.id!=null&&this.$store.state.login.uuid!=null)">
        <div class="app-container">
          <div class="sidebar">
            <img src="../assets/logo2.png" class="mycenter" style="width: 170px;">
            <my-button class='mycenter' @click="this.$router.push('/')" style="background-color: rgb(37, 99, 235);border-radius: 8px; margin-bottom: 60px;">
              <div style="font-size: 15px; color:white">На главную</div>
            </my-button>
            <img src="../assets/lk3.png" class="mycenter" style="width: 100px; ">
            <h3 style="color: rgb(45, 62, 80); margin-top: 0px;margin-bottom: 4px;" class="mycenter">{{ this.$store.state.login.name }} {{ this.$store.state.login.surname }}</h3>
            <h5 class="mycenter" style="color: rgb(45, 62, 80);margin-bottom: 40px; margin-top: 0px;">ID: {{ this.$store.state.login.id }}; Pin-code: {{ this.$store.state.login.pin_code }}</h5>
            <nav>
              <button @click="$router.push('/account')" class="menu_btn" style="background-color: rgba(196, 211, 247, 0.51);border-radius: 4px;width: 100%; padding-top: 15px; padding-bottom: 10px; margin-bottom: 30px;">
                <img src="../assets/clock.png" style="width: 35px;white-space: nowrap; margin-right: 15px;margin-left: 15px;">
                <span style="white-space: nowrap; ">Рабочая неделя </span>
              </button>
            </nav>

            <my-button class="mycenter exit-btn-container" @click="logOut" style="display: flex; align-items: center; background-color: rgb(37, 99, 235);border-radius: 8px; margin-bottom: 15px;" >
              <img src="../assets/exit.png" style="height: 30px; margin-right: 7px;">
              <div style="font-size: 15px; color:white;">Выход</div>
            </my-button>
            
          </div>

          <div class="main-content">
            <week-form> </week-form>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
export default {
  methods:{
    logOut(){
        this.$store.commit('login/CLEAR_AUTH')
        this.$store.commit('sheduleMod/CLEAR_SHEDULE')
      },
  }
}
</script>

<style scoped>
.app-container {
  margin-left: 0px;
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 280px;
  background: #ffffffbf;
  /* padding: 20px; */
  color: white;
  position: fixed;
  height: 100%;
  border-radius: 20px;
  box-shadow: 2px 0 5px rgba(244, 243, 243, 0.1);
  top: 0; 
  left: 0;
  margin: 0;
  justify-content: space-between;
  flex-direction: column;
  display: flex;
}

.main-content {
  flex: 1;
  margin-left: 250px;
  padding: 20px;
}
.menu_btn{
  border: None;
  color:rgb(45, 62, 80);
  background: None;
  font-size: 20px;
  /* margin-top: 20px; */
  margin-bottom: 40px;
  display: flex;
}
.exit-btn-container {
  margin-top: auto;
}
</style>