<template>
  <h2 class='mycenter' style="margin-top: 0px; color:white">Больничные и отпуска</h2>
	<div v-if="(this.$store.state.sheduleMod.holidays.length>0)">
		<transition-group name="holiday-form">
      <holiday-item @date-change="updateHoliday" class="holiday" v-for="(holiday,index) in this.$store.state.sheduleMod.holidays" v-bind:key="index" v-bind:holiday="holiday" v-bind:index="index" v-on:localHolidays="this.localHolidays"> </holiday-item>
		</transition-group>
	</div>
	<h2 v-if="(this.$store.state.sheduleMod.holidays.length==0)" style="color: red;
  margin-left: auto;
  margin-right: auto;
  text-align: center; margin-top: 150px;">У Вас не запланировано отпусков</h2>
	<my-button class="mycenter exit-btn-container" @click="saveAllChanges" style="display: flex; align-items: center; background-color: rgb(37, 99, 235);border-radius: 8px; margin-bottom: 15px; margin-top: 15px;" >
    <div style="font-size: 17px; color:white;">Сохранить</div>
  </my-button>
</template>

<script>

import HolidayItem from './HolidayItem.vue';
import { mapMutations } from 'vuex';
export default {
	data(){
		return{
			localHolidays: JSON.parse(JSON.stringify(this.$store.state.sheduleMod.holidays))
		};
	},
  name:'holiday-form',
	components: {HolidayItem},
	methods: {
		...mapMutations('sheduleMod', ['UPDATE_HOLIDAY','SET_HOLIDAYS']),
		updateHoliday({ index, start, end }) {
      this.localHolidays[index] = {
        ...this.localHolidays[index],
        start,
        end
      };
    },
		saveAllChanges() {
      this.SET_HOLIDAYS(this.localHolidays);
		}
	}
}
</script>

<style scoped>
/* .task-list-item{
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
} */
</style>