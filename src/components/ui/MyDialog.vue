<template>
    <div class="dialog" v-if="show===true" @click.stop="hideDialog">
        <div @click.stop class="dialog__content">
          <button class="close-btn" @click.stop="hideDialog">
            <img src="../../assets/xxx.png" alt="Закрыть">
          </button>
					<slot></slot>
				</div>
    </div>
</template>

<script>
import MyButton from './MyButton.vue';
export default {
    components:{
      MyButton
    },
    name:'my-dialog',
    props:{
      show:{
        type: Boolean,
        default:false
      }
    },
		methods:{
			hideDialog(){
				this.$emit('update:show',false)
			}
		}
}
</script>

<style scoped>

.dialog{
  
  padding: 24px;
	top:0;
	bottom:0;
	right:0;
  box-shadow: 10 4px 16px rgba(19, 19, 184, 0.823);
	left:0;
	background: rgba(0,0,0,0.5);
	position:fixed;
	display:flex;
  z-index: 1000000;
}
.dialog__content{
	margin:auto;
	background: white;
	border-radius: 12px;
	min-height: 300px;
	min-width: 600px;
  max-width: 900px;
	padding: 50px;
  position: relative;
}
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
}

.close-btn img {
  width: 40px;
}
</style>