import { useRef } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './Filter.module.css'

const Filter = ({filter, onChange}) => {

  const inputRef = useRef('');

const handleFinding = () => {
    const inputValue = inputRef.current.value;
    const lowerValue = inputValue.toLowerCase();
    onChange(lowerValue);
  };


    const filterInputId = nanoid();
    return (
      <>
        <label htmlFor={filterInputId}>Find contacts by name</label>
        <input
          id={filterInputId}
          ref={inputRef}
          className={css.filterInput}
          type="text"
          name="filter"
          value={filter}
          title="Find contact by name"
          onChange={handleFinding}
        ></input>
      </>
    );
}

Filter.propTypes = {
    filter: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

export default Filter;
