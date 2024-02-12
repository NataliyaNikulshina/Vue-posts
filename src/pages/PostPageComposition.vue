<template>
  <div class="page">
    <h1>Мой проект</h1>
    <MyInput v-model="searchQuery" placeholder="Поиск..."></MyInput>
    <div class="page__btns">
      <MySelect v-model="selectedSort" :options="sortOptions" />
    </div>
    <PostList
      :posts="sortedAndSearchedPosts"
      v-if="!isLoading"
    />
    <div v-else>Загрузка ...</div>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import usePost from "@/hooks/usePosts.js";
import useSortedPosts from "@/hooks/useSortedPosts.js";
import useSortedAndSearchedPosts from "@/hooks/sortedAndSearchedPosts.js";
import { ref } from "vue";
import axios from "axios";
export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      modalVisible: false,
      sortOptions: [
        { value: "title", name: "По названию" },
        { value: "body", name: "По содержанию" },
        { value: "id", name: "По номеру поста" },
      ],
    };
  },
  setup(props) {
    const {posts, isLoading, totalPages} = usePost(10);
    const {sortedPosts, selectedSort} = useSortedPosts(posts);
    const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts)
    return {
      posts,
      totalPages,
      isLoading,
      sortedPosts,
      selectedSort,
      searchQuery,
      sortedAndSearchedPosts,
    }
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
