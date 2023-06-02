import { useState, useRef } from 'react';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

const ContactForm = ({ prevContacts, onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const nameInputRef = useRef();
  const numberInputRef = useRef();

  const nameChange = () => {
    setName(nameInputRef.current.value);
  };

  const numberChange = () => {
    setNumber(numberInputRef.current.value);
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    const id = nanoid();
    const onlyNumber = number.replace(/[^\d]/g, '');
    const checkNumber = prevContacts.find(
      contact => contact.number.replace(/[^\d]/g, '') === onlyNumber
    );
    const lowerName = name.toLowerCase();
    const checkName = prevContacts.find(
      contact => contact.name.toLowerCase() === lowerName
    );
    if (checkNumber === undefined && checkName === undefined) {
      onSubmit({ id, name, number });
    } else if (checkName !== undefined) {
      Notiflix.Notify.info(`${name} is already in contacts.`);
    } else if (checkNumber !== undefined) {
      Notiflix.Notify.info(`${number} is already in contacts.`);
    }
    reset();
  };

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label htmlFor={nameInputId}>Name</label>
      <input
        id={nameInputId}
        ref={nameInputRef}
        type="text"
        name="name"
        value={name}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        onChange={nameChange}
        required
      />
      <label htmlFor={numberInputId}>Number</label>
      <input
        id={numberInputId}
        ref={numberInputRef}
        type="tel"
        name="number"
        value={number}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        onChange={numberChange}
        required
      />
      <button className={css.formButton} type="submit">
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  prevContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
