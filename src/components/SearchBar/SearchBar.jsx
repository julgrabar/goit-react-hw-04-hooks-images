import propTypes from 'prop-types';
import { useState } from 'react';
import { StyledSearchBar, SearchForm } from './SearchBar.styled';

export const SearchBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const onInput = e => {
    setSearchValue(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();

    if (!searchValue.trim()) {
      alert('Enter the search request');
      return;
    }

    onSearch(searchValue);
  };

  return (
    <StyledSearchBar>
      <SearchForm onSubmit={onSubmit}>
        <button type="submit">
          <span className="material-icons">search</span>
        </button>

        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onInput}
          value={searchValue}
        />
      </SearchForm>
    </StyledSearchBar>
  );
};

SearchBar.propTypes = {
  onSearch: propTypes.func.isRequired,
};
