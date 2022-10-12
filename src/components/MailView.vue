<template>
  <div class="email-display">
    <div>
      <button @click="toggleArchive">{{email.archived ? 'Move to inbox (e)' : 'Archive (e)'}}</button>
      <button @click="toggleRead">{{ email.read ? "Mark unread (r)" : "Mark read (r)" }}</button>
      <button>Newer</button>
      <button>Older</button>
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
import axios from "axios";
import useKeyDown from "@/composables/useKeyDown";

export default {
  props: {
    email: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    useKeyDown("r", () => toggleRead());
    useKeyDown("e", () => toggleArchive());

    let toggleRead = () => {
      props.email.read = !props.email.read;
      axios.put(`http://localhost:3000/emails/${props.email.id}`, props.email);
    };

    let toggleArchive = () => {
      props.email.archived = !props.email.archived;
      axios.put(`http://localhost:3000/emails/${props.email.id}`, props.email);
    };

    return {
      format,
      marked,
      toggleRead,
      toggleArchive
    };
  },
  methods: {}
};
</script>

<style></style>
