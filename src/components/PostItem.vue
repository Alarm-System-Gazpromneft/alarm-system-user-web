<template>
  <div class="problem-card">
		<div>
			<span v-show='post.priority=="critical"' class="priority-label priority-critical">{{ post.priority }}</span>
			<span v-show='post.priority=="high"' class="priority-label priority-high">{{ post.priority }}</span>
			<span v-show='post.priority=="low"' class="priority-label priority-low">{{ post.priority }}</span>
			<span class="problem-id" style="margin-left: 15px;display: inline-block;">ID: {{ post.id }}</span>
		
      <h3 class="problem-title">{{ post.name }}</h3>
      <p class="problem-time" style="display: inline;">{{ formattedDate }}</p>
      <button class="details-button" style='display: inline;float: right;' @click="showDialog">Подробнее</button>
  </div>
	</div>

		<my-dialog v-model:show="dialogVisible">
			<info-form v-model:description="post.description" v-model:name="post.name" v-model:id="post.id" v-model:priority="post.priority" v-model:creation_time="formattedDate"/>
		</my-dialog>
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
/* Общие стили карточки */
.problem-card {
  background: #fff;
  border-radius: 1rem;
  padding: 1.2rem 1.5rem;
  box-shadow: 0 10px 12px rgba(0,0,0,0.05);
  margin-bottom: 1.2rem;
  font-family: 'Inter', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  position: relative;
  transition: transform 0.2s ease;
}

.problem-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
}

/* Метка приоритета */
.priority-label {
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: 0.5rem;
  display: inline-block;
}

/* Приоритеты */
.priority-critical {
  background-color: #fee2e2;
  color: #b91c1c;
}

.priority-high{
  background-color: #fef3c7;
  color: #b45309;
}

.priority-low {
  background-color: #f3f4f6;
  color: #6b7280;
}

/* Заголовок проблемы */
.problem-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0.3rem 0;
  color: #111827;
}

/* ID и дата */
.problem-id,
.problem-time {
  font-size: 0.875rem;
  color: #6b7280;
}

.details-button {
  margin-top: 0.5rem;
  align-self: flex-end;
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.6rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.details-button:hover {
  background-color: #2563eb;
}
.post {
	padding:15px;
	border: 2px solid rgb(57, 106, 221);
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.post__btns{
	display: flex;
}
</style>