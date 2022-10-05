<template>
  <table class="mail-table">
    <tbody>
      <tr
        v-for="email in unarchiveEmails"
        :key="email.id"
        @click="readEmail(email)"
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
</template>

<script>
import format from "date-fns/format";
import axios from "axios";
export default {
  async setup() {
    let { data: emails } = await axios.get("http://localhost:3000/emails");
    return {
      format,
      emails
    };
  },
  methods: {
    readEmail(email) {
      email.read = true
      this.updateEmail(email)
    },
    archiveEmail(email) {
      email.archived = true
      this.updateEmail(email)
    },
    updateEmail(email) {
      axios.put(`http://localhost:3000/emails/${email.id}`, email)
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
