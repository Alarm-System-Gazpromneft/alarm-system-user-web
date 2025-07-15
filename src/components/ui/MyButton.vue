<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<script>
export default {
	name: 'my-button'
}
</script>

<style>
.btn {
	align-self: flex-end;
	padding: 10px 15px;
	background: none;
	color: rgb(22, 7, 110);
	border: None;
	cursor: pointer;
	box-shadow: 0 10px 12px rgba(0,0,0,0.05);
	/* border: 2px solid rgba(35, 35, 35, 0.499); */
}
</style>