<template>
  <div v-if="posts.length > 0">
    <p>Список постов</p>
    <transition-group name="post-list">
      <PostItem
      v-for="post in posts"
      :post="post"
      :key="post.id"
      @remove="$emit('remove', post)"
    />
    </transition-group>
  </div>
  <h2 v-else>
    Список постов пуст
  </h2>
</template>

<script>
import PostItem from "@/components/PostItem";
export default {
  components: { PostItem },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.post-list-item {
  display: inline-block;
  margin-right: 10px;
}
.post-list-enter-active, .post-list-leave-active {
  transition: all 0.4s;
}
.post-list-enter, .post-list-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

.post-list-move {
  transition: transform 0.4s;
}
</style>
