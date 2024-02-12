import axios from "axios";
import { onMounted, ref } from "vue";

export default function usePosts(limit) {
  const posts = ref([]);
  const totalPages = ref(0);
  const isLoading = ref(true);
  const fetching = async () => {
    try {
      const responce = await axios.get(
        "https://jsonplaceholder.typicode.com/posts",
        {
          params: {
            _page: 1,
            _limit: limit,
          },
        }
      );
      totalPages.value = Math.ceil(responce.headers["x-total-count"] / limit);
      posts.value = responce.data;
      // console.log(responce);
    } catch (e) {
      console.log(e)
    } finally {
      isLoading.value = false;
    }
  }

  onMounted(fetching)

  return {
    posts, isLoading, totalPages
  }
}
