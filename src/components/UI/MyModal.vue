<template>
  <div class="modal" v-if="show" @click.stop="hideModal">
    <div @click.stop class="modal__content">
        <slot></slot>
    </div>
  </div>
</template>

<script>
import toogleMixin from '@/mixins/toogleMixin.js';
export default {
  name: "MyModal",
  mixins: [toogleMixin]
};
</script>

<style scoped>
.modal {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.3);
    position: fixed;
    display: flex;
}

.modal__content {
    margin: auto;
    background: white;
    border-radius: 12px;
    min-height: 50px;
    min-width: 350px;
    padding: 20px;
}
</style>
