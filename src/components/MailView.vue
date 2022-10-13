<template>
  <div class="email-display">
    <div>
      <button @click="toggleArchive">
        {{ email.archived ? "Move to inbox (e)" : "Archive (e)" }}
      </button>
      <button @click="toggleRead">{{ email.read ? "Mark unread (r)" : "Mark read (r)" }}</button>
      <button @click="goNewer">Newer (k)</button>
      <button @click="goOlder">Older (j)</button>
    </div>
    <h2 class="mb-0">
      Subject: <strong>{{ email.subject }}</strong>
    </h2>
    <div>
      <em>From {{ email.from }} on {{ format(new Date(email.sentAt), "MMM do yyyy") }}</em>
    </div>
    <div v-html="marked(email.body)"></div>
  </div>
</template>

<script>
import format from "date-fns/format";
import marked from "marked";
import useKeyDown from "@/composables/use-keydown";
import { inject } from "vue";

export default {
  // inject: ["$axios"],
  props: {
    email: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    const $axios = inject("$axios");

    useKeyDown("r", () => toggleRead());
    useKeyDown("e", () => toggleArchive());
    useKeyDown("k", () => goNewer());
    useKeyDown("j", () => goOlder());
    useKeyDown("[", () => goNewerAndArchive());
    useKeyDown("]", () => goOlderAndArchive());

    let toggleRead = () => {
      emit("changeEmail", {toggleRead : true, save: true});
    };

    let toggleArchive = () => {
      emit("changeEmail", {toggleArchive : true, save: true, closeModal: true});
    };

    let goNewer = () => {
      emit("changeEmail", {changeIndex: -1});
    };

    let goOlder = () => {
      emit("changeEmail", {changeIndex: 1});
    };

    let goNewerAndArchive = () => {
      emit("changeEmail", {changeIndex: -1, toggleArchive: true, save: true});
    };

    let goOlderAndArchive = () => {
      emit("changeEmail", {changeIndex: 1, toggleArchive: true, save: true});
    };

    return {
      format,
      marked,
      toggleRead,
      toggleArchive,
      goNewer,
      goOlder,
      goNewerAndArchive,
      goOlderAndArchive,
      $axios
    };
  },
  methods: {}
};
</script>

<style></style>
