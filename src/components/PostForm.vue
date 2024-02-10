<template>
  <form class="form" @submit.prevent>
    <p>Создание поста</p>
    <MyInput
      v-model="post.title"
      type="text"
      placeholder="Название"
    />
    <MyInput
      v-model="post.body"
      type="text"
      placeholder="Описание"
    />
    <MyButton class="btn" @click="createPost">Создать</MyButton>
  </form>
</template>

<script>
import MyInput from './UI/MyInput.vue';

export default {
    data() {
        return {
            post: {
                title: '',
                body: ''
            }
        };
    },
    methods: {
        createPost() {
            this.post.id = Date.now();
            this.$emit('create', this.post);
            this.post = {
                title: '',
                body: ''
            };
        }
    },
    components: { MyInput }
}
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
}

.btn {
  align-self: end;
  margin-top: 15px;
}
</style>
