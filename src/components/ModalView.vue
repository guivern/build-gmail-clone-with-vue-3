<template>
  <div class="modal">
    <div class="overlay" @click="emit('closeModal')"></div>
    <div class="modal-card">
      <slot />
    </div>
  </div>
</template>

<script>
import { onBeforeUnmount } from "vue";

export default {
  setup(props, { emit }) {
    let onKeydown = e => {
      console.log(e.key);
      if (e.key === "Escape") {
        emit("closeModal");
      }
    };

    window.addEventListener("keydown", onKeydown);

    onBeforeUnmount(() => {
      window.removeEventListener("keydown", onKeydown);
    });

    return {
      emit
    };
  }
};
</script>

<style></style>
