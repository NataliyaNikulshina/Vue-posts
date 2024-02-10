<template>
  <div class="app">
    <h1>Мой проект</h1>
    <MyInput v-model="searchQuery" placeholder="Поиск..."></MyInput>
    <div class="app__btns">
      <MyButton @click="showModal(modalVisible)">Создать пост</MyButton>
      <MySelect v-model="selectedSort" :options="sortOptions" />
    </div>
    <!-- <MyButton @click="feachPosts">Загрузить посты</MyButton> -->
    <MyModal v-model:show="modalVisible">
      <PostForm @create="createPost" />
    </MyModal>
    <PostList :posts="sortedAndSearchedPosts" @remove="removePost" v-if="!isLoading" />
    <div v-else>Загрузка ...</div>
    <NumberPages :pages="totalPages" :pagesCurrent="page" @update:pagesCurrent="setCurrentPage" />
  </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import NumberPages from "@/components/NumberPages.vue";
import axios from "axios";
export default {
  components: {
    PostForm,
    PostList,
    NumberPages
},
  data() {
    return {
      posts: [],
      modalVisible: false,
      modificatorValue: "",
      isLoading: false,
      selectedSort: "",
      searchQuery: "",
      page: 1,
      limit: 10,
      totalPages: 0,
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
      // console.log(post);
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    showModal(modalVisible) {
      this.modalVisible = !modalVisible;
    },
    setCurrentPage(pageNumber) {
      this.page = pageNumber;
    },
    async feachPosts() {
      try {
        this.isLoading = true;
        const responce = await axios.get(
          "https://jsonplaceholder.typicode.com/posts", {
            params: {
              _page: this.page,
              _limit: this.limit
            }
          }
        );
        this.totalPages = Math.ceil(responce.headers['x-total-count'] / this.limit);
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
  computed: {
    sortedPosts() {
      if (this.selectedSort === "id") {
        return [...this.posts].sort((post1, post2) => post1.id - post2.id);
      } else {
        return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]));
      }
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }
  },
  watch: {
    page() {
      this.feachPosts()
    },
    // selectedSort(newValue) {
    //   if (newValue === "id") {
    //     this.posts.sort((a, b) => {
    //       return a.id - b.id;
    //     });
    //   } else {
    //     console.log(newValue);
    //     this.posts.sort((post1, post2) => {
    //       return post1[newValue]?.localeCompare(post2[newValue]);
    //     });
    //   }
    // },
  },
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
}

.app__btns {
  display: flex;
  justify-content: space-between;
}
</style>
