<template>
  <div class="page">
    <h1>Мой проект</h1>
    <MyInput v-model="searchQuery" placeholder="Поиск..."></MyInput>
    <div class="page__btns">
      <MyButton @click="showModal(modalVisible)">Создать пост</MyButton>
      <MySelect v-model="selectedSort" :options="sortOptions" />
    </div>
    <!-- <MyButton @click="feachPosts">Загрузить посты</MyButton> -->
    <MyModal v-model:show="modalVisible">
      <PostForm @create="createPost" />
    </MyModal>
    <PostList
      :posts="sortedAndSearchedPosts"
      @remove="removePost"
      v-if="!isLoading"
    />
    <div v-else>Загрузка ...</div>
    <div ref="observer" class="observer"></div>
    <!-- Пример постраничной пагинации
      <NumberPages :pages="totalPages" :pagesCurrent="page" @update:pagesCurrent="setCurrentPage" /> -->
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
    NumberPages,
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
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );
        this.totalPages = Math.ceil(
          responce.headers["x-total-count"] / this.limit
        );
        this.posts = responce.data;
        // console.log(responce);
      } catch (e) {
        alert("Ошибка");
      } finally {
        this.isLoading = false;
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1;
        const responce = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );
        this.totalPages = Math.ceil(
          responce.headers["x-total-count"] / this.limit
        );
        this.posts = [...this.posts, ...responce.data];
        // console.log(responce);
      } catch (e) {
        alert("Ошибка");
      }
    },
  },
  mounted() {
    this.feachPosts();
    // observer для бесконечной прокрутки
    console.log(this.$refs.observer);
    const options = {
      rootMargin: "0px",
      threshold: 1.0,
    };
    const callback = (entries, observer) => {
      if (entries[0].isIntersecting && this.page < this.totalPages) {
        this.loadMorePosts();
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer);
  },
  computed: {
    sortedPosts() {
      if (this.selectedSort === "id") {
        return [...this.posts].sort((post1, post2) => post1.id - post2.id);
      } else {
        return [...this.posts].sort((post1, post2) =>
          post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
        );
      }
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  watch: {
    // // Постраничная пагинация
    // page() {
    //   this.feachPosts()
    // },
    // // пример сортировки через watch, но это не эффективно
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

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.page__btns {
  display: flex;
  justify-content: space-between;
}

.observer {
  height: 10px;
}
</style>
