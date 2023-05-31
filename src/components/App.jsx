import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  lokalStorageKey = "phonebook";
  //czy to właściwe umieszczenie stałej?

  addContact = newContact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  filterContacts = value => {
    this.setState({ filter: value });
  };

  deleteContact = id => {
    this.setState(prevState => {
      const newTable = prevState.contacts.filter(contact => contact.id !== id);
      return {
        contacts: [...newTable],
      };
    });
  };

  componentDidMount() {
    const { contacts } = this.state;
    try {
      const contactsListJSON = localStorage.getItem(this.lokalStorageKey);
      const contactsList = contactsListJSON === null ? contacts : JSON.parse(contactsListJSON);
      this.setState({ contacts: contactsList });
    } catch (error) {
      console.error("Get state error: ", error.message);
    }
  }

  componentDidUpdate() {
    const { contacts} = this.state;
    try {
      const updatedContacts = JSON.stringify(contacts);
      localStorage.setItem(this.lokalStorageKey, updatedContacts);
    } catch (error) {
      console.error("Set state error: ", error.message);
    }
  }

  render() {
    const { contacts, filter } = this.state;
    return (
      <>
        <div>
          <h1>Phonebook</h1>
          <ContactForm prevContacts={contacts} onSubmit={this.addContact} />
          <h2>Contacts</h2>
          <Filter filter={filter} onChange={this.filterContacts} />
          <ContactList
            filter={filter}
            contacts={contacts}
            onClick={this.deleteContact}
          />
        </div>
      </>
    );
  }
}
