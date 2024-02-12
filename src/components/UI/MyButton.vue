<template>
    <button 
    class="btn"
    :class="{
        btn__white: color === 'white',
      }"
    >
        <slot></slot>
    </button>
</template>

<script>
export default {
   name: "MyButton",
   props: {
    color: [String]
   },
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
  cursor: pointer;
}

.btn__white {
  color: #fff;
  border: 1px solid #fff;
}
</style>