import { useEffect, useState } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export const App = () => {
  const someContacts = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];

   const lokalStorageKey = 'phonebook';

  const [contacts, setContacts] = useState(() => {
    const contactsList = JSON.parse(localStorage.getItem(lokalStorageKey));
    return contactsList && contactsList.length ? contactsList : someContacts;
  });

  const [filter, setFilter] = useState('');

  const addContact = newContact => {
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const filterContacts = value => {
    setFilter(value);
  };

  const deleteContact = id => {
    setContacts(prevContacts => {
      const newTable = prevContacts.filter(contact => contact.id !== id);
      return [...newTable];
    });
  };

  useEffect(() => {
    try {
      localStorage.setItem(lokalStorageKey, JSON.stringify(contacts));
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  }, [contacts]);

  return (
    <>
      <div>
        <h1>Phonebook</h1>
        <ContactForm prevContacts={contacts} onSubmit={addContact} />
        <h2>Contacts</h2>
        <Filter filter={filter} onChange={filterContacts} />
        <ContactList
          contacts={contacts}
          filter={filter}
          onClick={deleteContact}
        />
      </div>
    </>
  );
};
