<template>
  <div v-show="isLoading">
		<img src="../assets/loading-load.gif" class="mycenter" style="width: 300px; background-color: auto;">
	</div>
	<div v-if="(posts.length>0 && !isLoading)">
		<transition-group name="task-list">
			<!-- <post-item class="post" v-for="post in posts" v-bind:key="post.id" v-bind:post="post" @remove="$emit('remove',post)"> </post-item> -->
      <post-item class="post" v-for="post in posts" v-bind:key="post.id" v-bind:post="post"> </post-item>
		</transition-group>
	</div>
	<h2 v-if="(posts.length===0 && !isLoading)" style="color: red">Список задач пуст</h2>
</template>

<script>
import { is } from 'date-fns/locale';
import PostItem from './PostItem.vue';

export default {
  name:'post-list',
	components: {PostItem},
	props: {
		posts:{
			type: Array,
			required: true
		},
    isLoading:{
      type:Boolean,
      required: true
    }
	},  
}
</script>

<style scoped>
.task-list-item{
	display: inline-block;
	margin-right: 10px;
}
.task-list-enter-active,
.task-list-leave-active {
	transition: all 0.4s ease;
}
.task-list-enter-from,
.task-list-leave-to{
	opacity: 0;
	transform: translateX(30px);
}
.task-list-move{ 
	transition: transform 0.4s ease;
}
</style>