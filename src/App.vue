<template>
  <Navbar />
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
export default {
  components: {
        Navbar
    }
};
</script>

<style>
* {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgb(0, 81, 81) rgb(236, 236, 236);
}

::-webkit-scrollbar {
  width: 10px;
}

/* Custom scrollbar handle */
::-webkit-scrollbar-thumb {
  background: rgb(0, 81, 81);
  /* border-radius: 5px; */
}

/* Optional: Hover effect for scrollbar handle */
::-webkit-scrollbar-thumb:hover {
  background: rgb(236, 236, 236);
}
</style>
