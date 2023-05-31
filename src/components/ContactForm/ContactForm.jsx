import { Component } from 'react';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  static propTypes = {
    prevContacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ).isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  handleChange = e => {
    const inputValue = e.target.value;
    const inputName = e.target.name;
    this.setState({ [inputName]: inputValue });
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    const { prevContacts, onSubmit } = this.props;
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
    this.reset();
  };

  render() {
    const { name, number } = this.state;
    const nameInputId = nanoid();
    const numberInputId = nanoid();

    return (
      <form className={css.form} onSubmit={this.handleSubmit}>
        <label htmlFor={nameInputId}>Name</label>
        <input
          id={nameInputId}
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          onChange={this.handleChange}
          required
        />
        <label htmlFor={numberInputId}>Number</label>
        <input
          id={numberInputId}
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          onChange={this.handleChange}
          required
        />
        <button className={css.formButton}type="submit">Add contact</button>
      </form>
    );
  }
}

export default ContactForm;
