<template>
  <div class="modal">
    <div class="overlay" @click="emit('closeModal')"></div>
    <div class="modal-card">
      <slot />
    </div>
  </div>
</template>

<script>
import useKeyDown from "@/composables/use-keydown";

export default {
  setup(props, { emit }) {
    useKeyDown("Escape", () => emit("closeModal"));

    return {
      emit
    };
  }
};
</script>

<style></style>
