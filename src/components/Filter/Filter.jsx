import { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './Filter.module.css'

class Filter extends Component {
  static propTypes = {
    filter: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  handleFinding = e => {
    const inputValue = e.target.value;
    const lowerValue = inputValue.toLowerCase();
    const { onChange } = this.props;
    onChange(lowerValue);
  };

  render() {
    const { filter } = this.props;
    const filterInputId = nanoid();
    return (
      <>
        <label htmlFor={filterInputId}>Find contacts by name</label>
        <input
          id={filterInputId}
          className={css.filterInput}
          type="text"
          name="filter"
          value={filter}
          title="Find contact by name"
          onChange={this.handleFinding}
        ></input>
      </>
    );
  }
}

export default Filter;
