import { reactive, ref } from "vue";
import axios from "axios";

// se saca afuera para poder persistir el estado si es utilizado por otros componentes
// caso contrario, siempre que se ejecute la funcion, se reiniciara el estado
let selectedEmails = reactive(new Set());

export default function useEmailSelection() {
  let toggleSelectedEmails = function(email) {
    if (selectedEmails.has(email)) {
      selectedEmails.delete(email);
    } else {
      selectedEmails.add(email);
    }
  };

  let clear = function() {
    selectedEmails.clear();
  };

  let addMultiple = function(emails) {
    emails.forEach(email => selectedEmails.add(email));
  };

  let forSelected = fn => {
    selectedEmails.forEach(email => {
      fn(email);
      axios.put(`http://localhost:3000/emails/${email.id}`, email);
    });
  };

  let markRead = () => forSelected(email => (email.read = true));
  let markUnread = () => forSelected(email => (email.read = false));
  let archive = () => {
    forSelected(email => (email.archived = true));
    clear();
  };

  return {
    selectedEmails,
    toggleSelectedEmails,
    clear,
    addMultiple,
    markRead,
    markUnread,
    archive
  };
}
