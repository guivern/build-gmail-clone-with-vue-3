<template>
  <table class="mail-table">
    <tbody>
      <tr
        v-for="email in unarchiveEmails"
        :key="email.id"
        @click="openEmail(email)"
        :class="['clickable', email.read ? 'read' : '']"
      >
        <td><input type="checkbox" /></td>
        <td>{{ email.from }}</td>
        <td>
          <p>
            <strong>{{ email.subject }}</strong> - {{ email.body }}
          </p>
        </td>
        <td class="date">{{ format(new Date(email.sentAt), "MMM do yyyy") }}</td>
        <td><button @click="archiveEmail(email)">Archieve</button></td>
      </tr>
    </tbody>
  </table>
  <MailView v-if="openedEmail" :email="openedEmail" />
</template>

<script>
import format from "date-fns/format";
import axios from "axios";
import MailView from "./MailView.vue";
export default {
  components: {
    MailView
  },
  async setup() {
    let { data: emails } = await axios.get("http://localhost:3000/emails");
    return {
      format,
      emails,
      openedEmail: null
    };
  },
  methods: {
    openEmail(email) {
      email.read = true;
      this.openedEmail = email;
      this.updateEmail(email);
    },
    archiveEmail(email) {
      email.archived = true;
      this.updateEmail(email);
    },
    updateEmail(email) {
      axios.put(`http://localhost:3000/emails/${email.id}`, email);
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
