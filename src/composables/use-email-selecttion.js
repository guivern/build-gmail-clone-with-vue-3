import { reactive } from "vue";

// se saca afuera para poder persistir el estado si es utilizado por otros componentes
// caso contrario, siempre que se ejecute la funcion, se reiniciara el estado
let selectedEmails = reactive(new Set());

export default function useEmailSelection() {
  let toggleSelectedEmails = function(email) {
    if (this.selectedEmails.has(email)) {
      this.selectedEmails.delete(email);
    } else {
      this.selectedEmails.add(email);
    }
  };

  let clear = function() {
    this.selectedEmails.clear();
  }

  let addMultiple = function(emails) {
    emails.forEach(email => this.selectedEmails.add(email));
  }

  return {
    selectedEmails,
    toggleSelectedEmails,
    clear,
    addMultiple
  };
}
