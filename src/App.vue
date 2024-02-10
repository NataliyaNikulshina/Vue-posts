<template>
  <div class="app">
    <h1>Мой проект</h1>
    <div class="app__btns">
      <MyButton @click="showModal(modalVisible)">Создать пост</MyButton>
      <MySelect v-model="selectedSort" :options="sortOptions" />
    </div>
    <!-- <MyButton @click="feachPosts">Загрузить посты</MyButton> -->
    <MyModal v-model:show="modalVisible">
      <PostForm @create="createPost" />
    </MyModal>
    <PostList :posts="posts" @remove="removePost" v-if="!isLoading" />
    <div v-else>Загрузка ...</div>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import MyButton from "./components/UI/MyButton.vue";
import axios from "axios";
import MySelect from "./components/UI/MySelect.vue";
export default {
  components: {
    PostForm,
    PostList,
    MyButton,
    MySelect,
  },
  data() {
    return {
      posts: [],
      modalVisible: false,
      modificatorValue: "",
      isLoading: false,
      selectedSort: "",
      sortOptions: [
        { value: "title", name: "По названию" },
        { value: "body", name: "По содержанию" },
        { value: "id", name: "По номеру поста" },
      ],
    };
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.modalVisible = false;
      console.log(post);
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    showModal(modalVisible) {
      this.modalVisible = !modalVisible;
    },
    async feachPosts() {
      try {
        this.isLoading = true;
        const responce = await axios.get(
          "https://jsonplaceholder.typicode.com/posts?_limit=10"
        );
        this.posts = responce.data;
        // console.log(responce);
      } catch (e) {
        alert("Ошибка");
      } finally {
        this.isLoading = false;
      }
    },
  },
  mounted() {
    this.feachPosts();
  },
  watch: {
    selectedSort(newValue) {
      if (newValue === "id") {
        this.posts.sort((a, b) => {
          return a.id - b.id;
        });
      } else {
        console.log(newValue);
        this.posts.sort((post1, post2) => {
          return post1[newValue]?.localeCompare(post2[newValue]);
        });
      }
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.app__btns {
  display: flex;
  justify-content: space-between;
}
</style>
