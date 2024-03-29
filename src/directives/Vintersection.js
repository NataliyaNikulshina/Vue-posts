export default {
    mounted(el, binding) {
        // console.log(binding.value);
        // observer для бесконечной прокрутки
    const options = {
      rootMargin: "0px",
      threshold: 1.0,
    };
    const callback = (entries, observer) => {
      if (entries[0].isIntersecting) {
        binding.value.loadMorePosts();
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(el);
    },
    name: 'intersection'
}