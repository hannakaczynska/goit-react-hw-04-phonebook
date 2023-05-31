import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './ContactList.module.css'

class ContactList extends Component {
  static propTypes = {
    filter: PropTypes.string.isRequired,
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ).isRequired,
    onClick: PropTypes.func.isRequired,
  };

  handleClick = e => {
    const { onClick } = this.props;
    const contactId = e.target.id;
    onClick(contactId);
  };

  render() {
    const { contacts, filter } = this.props;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );

    return (
      <ul className={css.contactList}>
        {filteredContacts.map(contact => {
          return (
            <li className={css.contact} key={nanoid()}>
              <div>
                {contact.name}: {contact.number}
              </div>
              <button className={css.contactButton} type="button" id={contact.id} onClick={this.handleClick}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default ContactList;
