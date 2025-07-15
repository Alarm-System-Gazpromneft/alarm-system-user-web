<template>
    <select class='select' :value="modelValue" @change="changeOptions" :string="string">
      <option disabled value="">{{ string }}</option>
      <option v-for="option in options" :key="option.value"
      :value="option.value">
      {{ option.name }}
      </option>
    </select>
</template>

<script>
export default {
  name: 'my-select',
  props:{
    modelValue:{
      type: String,
    },
    string:{
      type: String,
    },
    options:{
      type: Array,
      default: ()=>[]
    }
  },
  methods:{
    changeOptions(event){
      this.$emit('update:modelValue',event.target.value)
    }
  }
}
</script>

<style scoped>
.select{
  border-radius: 8 px;
  border-color: white;
  cursor: pointer;
  box-shadow: 0 10px 12px rgba(0,0,0,0.05);
}
</style>