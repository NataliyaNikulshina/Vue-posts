<template>
  <h1>Пост № {{ $route.params.id }}</h1>
  <div v-if="!isLoading" class="wrapper">
    <p><strong>Название:</strong></p>
    <p>{{ this.post.title }}</p>
    <p><strong>Описание:</strong></p>
    <p>{{ this.post.body }}</p>
  </div>
  <div v-else>Загрузка ...</div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      post: {
        title: "",
        body: "",
      },
    };
  },
  methods: {
    ...mapActions({
      feachAllPosts: "post/feachAllPosts",
    }),
  },
  mounted() {
    this.feachAllPosts().then(() => {
      this.posts.forEach((el) => {
        if (el.id == this.$route.params.id) {
          this.post = {
            title: el.title,
            body: el.body,
          };
        }
      });
    });
  },
  computed: {
    ...mapState({
      posts: (state) => state.post.posts,
      isLoading: (state) => state.post.isLoading,
    }),
  },
};
</script>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>
