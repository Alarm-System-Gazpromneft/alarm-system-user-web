<template>
    <div>
      <div v-show="(this.$store.state.login.id===null&&this.$store.state.login.uuid==null)">
        <img src="../assets/logo2.png" class="mycenter" style="width: 300px;">
        <my-button class='mycenter' style="margin-top: 20px;" @click="$router.push('/login')">Авторизация</my-button>
      </div>
      <div v-show="(this.$store.state.login.id!==null&&this.$store.state.login.uuid!==null&& !this.$store.state.login.loading)">
        <h1>hi</h1>
      </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>