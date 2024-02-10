<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<script>
export default {
   name: "MyButton"

}
</script>

<style scoped>
.btn {
  padding: 10px 15px;
  background: transparent;
  color: teal;
  border: 1px solid teal;
  width: 200px;
  border-radius: 8px;
}
</style>