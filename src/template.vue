<template>
    <div>

    </div>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>

<template>
    <div class="card">
		<div>
			<div>id: {{ post.id }}</div>
			<div>Название: {{ post.name }}</div>
      <div>Время создания: {{ formattedDate}}</div>
      <div>Приоритет: {{ post.priority }}</div>
		</div>
		<div class='post__btns'>
			<!-- <my-button @click="$emit('remove',post)">Удалить</my-button> -->
			<my-button style="background-color: rgba(169, 204, 241, 0.182);border-radius: 8px;" @click="showDialog">Подробнее...</my-button>
			<my-dialog v-model:show="dialogVisible">
				<info-form v-model:description="post.description" v-model:name="post.name" v-model:id="post.id" v-model:priority="post.priority" v-model:creation_time="formattedDate"/>
			</my-dialog>
		</div>
	</div>
</template>

<script>
//import MyButton from "@/components/ui/MyButton";
export default {
	// components:{
	// 	MyButton
	// },
	data(){
		return {
			dialogVisible: false
		}
	},
  props:{
		post:{
			type: Object,
			required: true,
		}
	},computed: {
    formattedDate() {
      const date = new Date(this.post.creation_time);
      return new Intl.DateTimeFormat('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    },
	},
		methods:{
			showDialog(){
					this.dialogVisible=true;
					console.log(1)
				},
		}
}
</script>

<style scoped>
.card {
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  transition: transform 0.2s ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.1);
}

</style>