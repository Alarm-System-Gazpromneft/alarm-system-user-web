<template>
	<form @submit.prevent>
      <img src="../assets/logo2.png" class="mycenter" style="width: 300px;">
      <div>Id: {{ id }}</div>
      <div>Название: {{ name }}</div>
      <div>Время создания: {{ creation_time }}</div>
      <div>Приоритет: {{ priority }}</div>
			<h2>Информация: </h2>
      <div>{{this.description}}</div>
			<!-- <my-input v-focus v-model='post.title' type="text" placeholder="Name"/> -->
			<!-- <my-button @click="createpost" class="btn" style="margin-top: 15px;">Create</my-button> -->
		</form>
</template>

<script>
export default {
  name: 'info-form',
  props:{
    description: String,
    name: String,
    creation_time: Date,
    id: Number,
    priority: String
  },
	data(){
		return {
			post: {
				title: ""
			}
		}
	},
	// methods:
	// {
	// 	createpost(){
	// 				this.post.id=Date.now();
	// 				this.$emit('create',this.post)
	// 				this.post={
	// 					title: ''
	// 				}
	// 			},
	// }
}
</script>

<style>
form {
	display: flex;
	flex-direction: column;
}
</style>