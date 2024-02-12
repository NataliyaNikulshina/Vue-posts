<template>
    <div class="nav">
    <Logo @click="$router.push('/')" style="cursor: pointer"/>
    <div class="nav__btn">
        <MyButton color="white" @click="$router.push('/posts')">Посты</MyButton>
        <MyButton color="white" @click="$router.push('/store')">Посты из Vuex</MyButton>
        <MyButton color="white" @click="$router.push('/composition')">Composition</MyButton>
        <MyButton color="white" @click="$router.push('/about')">О сайте</MyButton>
    </div>
    </div>
    <!-- <router-link to="/posts">Посты</router-link>
    <router-link to="/about">О сайте</router-link> -->
  </template>
  
  <script>
  import Logo from '@/components/UI/Logo.vue';
  export default { 
    components: {Logo}
   };
  </script>
  
  <style scoped>
  .nav {
    height: 50px;
    background-color: teal;
    box-shadow: 2px 2px 4px grey;
    display: flex;
    align-items: center;
    padding: 0 15px;
  }

  .nav__btn {
    margin-left: auto;
    display: flex;
    gap: 10px;
  }


</style>
  