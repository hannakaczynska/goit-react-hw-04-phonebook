import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './ContactList.module.css';

const ContactList = ({ contacts, filter, onClick }) => {
  const handleClick = e => {
    onClick(e.target.id);
  };

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
            <button
              className={css.contactButton}
              type="button"
              id={contact.id}
              onClick={handleClick}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

ContactList.propTypes = {
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

export default ContactList;
