<template>
    <input v-bind:value="modelValue" @input="updateInput" :class="['input', $attrs.class]"  type="text">
</template>

<script>
export default {
    name: 'my-input',
		props: {
			modelValue: [String, Number]
		},
		methods:{
			updateInput(event){
				this.$emit('update:modelValue',event.target.value)
			}
		}
}
</script>

<style scoped>
.input {
	margin-top: 10px;
	box-shadow: 0 10px 12px rgba(0,0,0,0.05);
}
input::placeholder {
  color: rgb(22, 7, 110); 
  opacity: 1; 
}
</style>