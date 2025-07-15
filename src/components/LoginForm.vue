<template>
	<div :this.$store.state.login.loading class="loginform" style='width:900px;padding-top:10px; padding-bottom: 10px; padding-left: 20px;'>
		<form @submit.prevent>
				<!-- для отмены перезагрузки страницы пр иотправке формы -->
				<h4 class='mycenter' style="font-size: 22px; color: white">  Вход в систему</h4>
				<my-input class='loginInput' v-model='user.login' type="text" placeholder="Login" style="border-radius: 8px;" />
				<my-input class='loginInput' v-model='user.password' type="password" placeholder="Password" style="border-radius: 8px;"/>
				<my-button @click="loginUser" class="mycenter" style="margin-bottom:30px; border-color: #0079c2; margin-top: 15px;background-color: #0079c2; border-radius: 5px; color: white;">Вход</my-button>
			</form>
	</div>
</template>

<script>
export default {
	name: 'login-form',
	data(){
		return {
			user: {
				login: "",
				password:""
			}
		}
	},
	methods:
	{
		async loginUser(){
					if (this.user.login!=='' && this.user.password!==''){
						//this.$emit('login',[this.user.login,this.user.password])
						await this.$store.dispatch('login/login',this.user)
						console.log(this.$store.state.login.id);
						console.log(this.$store.state.login.uuid);     ////////////
						if (this.$store.state.login.uuid!==null && this.$store.state.login.id!=null){
							this.$router.push('/')
						}
					}
					else{
						alert('Заполните оба поля')
					}
				},
	},
	
}
</script>

<style>

.loginform {
	border: None;
	box-shadow: 0 10px 12px rgba(0,0,0,0.05);
	background-color: rgba(169, 204, 241, 0.182);
	/* border: 5px solid #3b3b43cd; */
	border-radius: 30px;
	display: block;
  margin-left: auto;
  margin-right: auto;
}
.loginInput{
	border:None;
	box-shadow: inset 0 0px 12px rgba(0,0,0,0.05);
	width: 600px;
	height: 30px;
	display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>