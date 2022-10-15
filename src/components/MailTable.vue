<template>
  <bulk-action-bar :emails="unarchiveEmails" />
  <h1>{{ selectedEmails.size }} Emails selected</h1>
  <table class="mail-table">
    <tbody>
      <tr
        v-for="email in unarchiveEmails"
        :key="email.id"
        :class="['clickable', email.read ? 'read' : '']"
      >
        <td>
          <input
            type="checkbox"
            @click="toggleSelectedEmails(email)"
            :checked="selectedEmails.has(email)"
          />
        </td>
        <td @click="openEmail(email)">{{ email.from }}</td>
        <td @click="openEmail(email)">
          <p>
            <strong>{{ email.subject }}</strong> - {{ email.body }}
          </p>
        </td>
        <td class="date" @click="openEmail(email)">
          {{ format(new Date(email.sentAt), "MMM do yyyy") }}
        </td>
        <td><button @click="archiveEmail(email)">Archieve</button></td>
      </tr>
    </tbody>
  </table>
  <ModalView v-if="openedEmail" @closeModal="openedEmail = null">
    <MailView :email="openedEmail" @changeEmail="changeEmail" />
  </ModalView>
</template>

<script>
import format from "date-fns/format";
import { inject, reactive } from "vue";
import MailView from "./MailView.vue";
import ModalView from "./ModalView.vue";
import useEmailSelection from "../composables/use-email-selecttion";
import BulkActionBar from "./BulkActionBar.vue";

export default {
  components: {
    MailView,
    ModalView,
    BulkActionBar
  },
  async setup() {
    const $axios = inject("$axios");
    let { data: emails } = await $axios.get("emails");

    return {
      format,
      emails,
      $axios,
      ...useEmailSelection()
    };
  },
  data() {
    return {
      openedEmail: null
    };
  },
  methods: {
    changeEmail({ toggleRead, toggleArchive, save, closeModal, changeIndex }) {
      let email = this.openedEmail;

      if (toggleRead) email.read = !email.read;
      if (toggleArchive) email.archived = !email.archived;
      if (save) this.updateEmail(email);
      if (closeModal) this.openedEmail = null;
      if (changeIndex) {
        let index = this.unarchiveEmails.indexOf(email);
        let newEmail = this.unarchiveEmails[index + changeIndex];
        this.openEmail(newEmail);
      }
    },
    openEmail(email) {
      this.openedEmail = email;
      if (email) {
        email.read = true;
        this.updateEmail(email);
      }
    },
    archiveEmail(email) {
      email.archived = true;
      this.updateEmail(email);
    },
    updateEmail(email) {
      this.$axios.put(`emails/${email.id}`, email);
    }
  },
  computed: {
    sortedEmails() {
      return this.emails.sort((a, b) => {
        return new Date(b.sentAt) - new Date(a.sentAt);
      });
    },
    unarchiveEmails() {
      return this.sortedEmails.filter(email => !email.archived);
    }
  }
};
</script>

<style></style>
