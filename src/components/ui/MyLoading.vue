<template>
  <div class="loading">
    <img
      class="img1"
      src="../../assets/loading-load.gif"
      alt="loading..."
      width="200"
    />
  </div>
</template>

<script>
export default {
  name: "my-loading"
};
</script>

<style>
.loading {
  position: absolute;
  z-index: 1000;
  background-color: white;
  inset: 0;
  text-align: center;
  line-height: 100vh;
}
.img1 {
  position: relative;
  margin: auto;
  margin-top: 20%;
}
</style>