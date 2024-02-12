<template>
  <div class="page">
    <h1>Мой проект</h1>
    <MyInput
      :model-value="searchQuery"
      @update:model-value="setSearchQuery"
      placeholder="Поиск..."
    >
    </MyInput>
    <div class="page__btns">
      <MyButton @click="showModal(modalVisible)">Создать пост</MyButton>
      <MySelect
        :model-value="selectedSort"
        @update:model-value="setSelectedSort"
        :options="sortOptions"
      />
    </div>
    <MyModal v-model:show="modalVisible">
      <PostForm @create="createPost" />
    </MyModal>
    <PostList
      :posts="sortedAndSearchedPosts"
      @remove="removePost"
      v-if="!isLoading"
    />
    <div v-else>Загрузка ...</div>
    <div
      v-intersection="{ loadMorePosts, page, totalPages }"
      class="observer"
    ></div>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import NumberPages from "@/components/NumberPages.vue";
import axios from "axios";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";

export default {
  components: {
    PostForm,
    PostList,
    NumberPages,
  },
  data() {
    return {
      modalVisible: false,
    };
  },
  methods: {
    ...mapMutations({
      setPage: "post/setPage",
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort',
    }),
    ...mapActions({
      loadMorePosts: "post/loadMorePosts",
      feachPosts: "post/feachPosts",
    }),
    createPost(post) {
      this.posts.push(post);
      this.modalVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    showModal(modalVisible) {
      this.modalVisible = !modalVisible;
    },
  },
  mounted() {
    this.feachPosts();
  },
  computed: {
    ...mapState({
      posts: (state) => state.post.posts,
      isLoading: (state) => state.post.isLoading,
      selectedSort: (state) => state.post.selectedSort,
      searchQuery: (state) => state.post.searchQuery,
      page: (state) => state.post.page,
      limit: (state) => state.post.limit,
      totalPages: (state) => state.post.totalPages,
      sortOptions: (state) => state.post.sortOptions,
    }),
    ...mapGetters({
      sortedPosts: "post/sortedPosts",
      sortedAndSearchedPosts: "post/sortedAndSearchedPosts",
    }),
  },
  watch: {},
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
