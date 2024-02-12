<template>
  <div class="page__wrapper">
    <div
      v-for="pageNumber in pages"
      :key="pageNumber"
      class="page"
      :class="{
        current__page: pagesCurrent === pageNumber,
      }"
      @click="changePage(pageNumber)"
    >
      {{ pageNumber }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pages: {
      type: Number,
      required: true,
    },
    pagesCurrent: {
      type: Number,
      required: true,
    },
  },
  methods: {
    changePage(pageNumber) {
        this.$emit('update:pagesCurrent', pageNumber)
    //   this.pagesCurrent = pageNumber;
    },
  },
};
</script>

<style scoped>
.page__wrapper {
  display: flex;
  gap: 8px;
  padding: 0 15px;
}
.page {
  border-radius: 50%;
  border: 1px solid black;
  padding: 6px 0;
  font-size: 12px;
  width: 30px;
  display: flex;
  justify-content: center;
  cursor: pointer;
}

.current__page {
  border: 2px solid teal;
}
</style>
