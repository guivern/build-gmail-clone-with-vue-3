<template>
  <div class="bulk-action-bar">
    <span class="checkbox">
      <input
        type="checkbox"
        :checked="allEmailsSelected"
        :class="[someEmailsSelected ? 'partial-check' : '']"
        @click="bulkSelectEmails"
      />
    </span>
    <span class="buttons">
      <button @click="markRead" :disabled="[...selectedEmails].every(x => x.read)">
        Mark read
      </button>
      <button @click="markUnread" :disabled="[...selectedEmails].every(x => !x.read)">
        Mark unread
      </button>
      <button @click="archive" :disabled="selectedEmails.size === 0">Archive</button>
    </span>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
import useEmailSelection from "../composables/use-email-selecttion";
export default {
  props: {
    emails: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const emailSelection = useEmailSelection();
    let numberSelected = computed(() => emailSelection.selectedEmails.size);
    let numberEmails = computed(() => props.emails.length);
    let allEmailsSelected = computed(() => numberSelected.value === numberEmails.value);
    let someEmailsSelected = computed(() => numberSelected.value > 0 && !allEmailsSelected.value);

    let bulkSelectEmails = () => {
      if (allEmailsSelected.value) {
        emailSelection.clear();
      } else {
        emailSelection.addMultiple(props.emails);
      }
    };

    return {
      allEmailsSelected,
      someEmailsSelected,
      bulkSelectEmails,
      selectedEmails: emailSelection.selectedEmails,
      markRead: emailSelection.markRead,
      markUnread: emailSelection.markUnread,
      archive: emailSelection.archive
    };
  }
};
</script>
>

<style lang="scss" scoped></style>
