import { onBeforeUnmount } from "vue";

let useKeyDown = (keyPressed, fn) => {
  let onKeydown = e => {
    if (e.key === keyPressed) {
      fn();
    }
  };

  window.addEventListener("keydown", onKeydown);
  onBeforeUnmount(() => {
    window.removeEventListener("keydown", onKeydown);
  });
};

export default useKeyDown;
