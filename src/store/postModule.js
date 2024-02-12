import axios from "axios";

export const postModule = {
    namespaced: true,
    state: () => ({
        posts: [],
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
    }),
    getters: {
        sortedPosts(state) {
            if (state.selectedSort === "id") {
              return [...state.posts].sort((post1, post2) => post1.id - post2.id);
            } else {
              return [...state.posts].sort((post1, post2) =>
                post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
              );
            }
          },
          sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter((post) =>
              post.title.toLowerCase().includes(state.searchQuery.toLowerCase())
            );
          },
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },
        setLoading(state, bool) {
            state.isLoading = bool;
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort;
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery;
        },
        setPage(state, page) {
            state.page = page;
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages;
        },
    },
    actions: {
        async feachPosts({state, commit}) {
            try {
              commit('setLoading', true);
              const responce = await axios.get(
                "https://jsonplaceholder.typicode.com/posts",
                {
                  params: {
                    _page: state.page,
                    _limit: state.limit,
                  },
                }
              );
              commit('setTotalPages', Math.ceil(
                responce.headers["x-total-count"] / state.limit));
              commit('setPosts', responce.data);
            } catch (e) {
              console.log(e);
            } finally {
                commit('setLoading', false);
            }
          },
          async loadMorePosts({state, commit}) {
            try {
              commit('setPage', state.page + 1);
              const responce = await axios.get(
                "https://jsonplaceholder.typicode.com/posts",
                {
                  params: {
                    _page: state.page,
                    _limit: state.limit,
                  },
                }
              );
              commit('setTotalPages', Math.ceil(
                responce.headers["x-total-count"] / state.limit));
              commit('setPosts', [...state.posts, ...responce.data]);
            } catch (e) {
                console.log(e);
            }
          }
    },
}