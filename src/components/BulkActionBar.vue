<template>
  <div>
    <input
      type="checkbox"
      :checked="allEmailsSelected"
      :class="[someEmailsSelected ? 'partial-check' : '']"
      @click="bulkSelectEmails"
    />
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
      bulkSelectEmails
    };
  }
};
</script>
>

<style lang="scss" scoped></style>
