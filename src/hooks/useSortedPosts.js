import {ref, computed} from 'vue'

export default function useSortedPosts(posts) {
    const selectedSort = ref('')
    const sortedPosts = computed(() => {
        if (selectedSort.value === "id") {
            return [...posts.value].sort((post1, post2) => post1.id - post2.id);
        }
        return [...posts.value].sort((post1, post2) => post1[selectedSort.value]?.localeCompare(post2[selectedSort.value]))
    })

    return {
        selectedSort, sortedPosts
    }
};